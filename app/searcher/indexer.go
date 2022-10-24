package searcher

import (
	"context"
	"fmt"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/analysis/analyzer/keyword"
	"github.com/blevesearch/bleve/v2/analysis/lang/en"
	"github.com/blevesearch/bleve/v2/mapping"
	"github.com/blevesearch/bleve/v2/search/query"
)

const indexPath = "content-search.bleve"

type Indexer interface {
	GetIDsFromTerm(ctx context.Context, term string) ([]string, error)
}

type indexer struct {
	index         bleve.Index
	containerRepo repository.Container
}

func NewIndexer(containerRepo repository.Container) Indexer {
	index, err := bleve.Open(indexPath)
	indexer := indexer{
		index:         index,
		containerRepo: containerRepo,
	}

	// if index doesn't exist, build it.
	if err == bleve.ErrorIndexPathDoesNotExist {
		indexer.index = indexer.buildSearchIndex()
	}

	return indexer
}

func (i indexer) GetIDsFromTerm(ctx context.Context, term string) ([]string, error) {
	q := query.NewMatchQuery(term)
	req := &bleve.SearchRequest{
		Size:    1000,
		Query:   q,
		Fields:  []string{"*"},
		Explain: true,
	}
	req.SortBy([]string{"_score"})

	search, err := i.index.SearchInContext(ctx, req)
	if err != nil {
		return nil, err
	}

	ids := make([]string, 0, search.Size())

	for _, hit := range search.Hits {
		ids = append(ids, hit.ID)
	}

	return ids, nil
}

func (i indexer) buildSearchIndex() bleve.Index {
	indexMapping := createMapping()

	index, err := bleve.New(indexPath, indexMapping)
	if err != nil {
		panic(err)
	}

	//TODO cancel with timeout
	containers, err := i.containerRepo.GetAll(context.Background())
	if err != nil {
		panic(err)
	}

	batch := index.NewBatch()
	for _, container := range containers {
		for _, bin := range container.Bins {
			for _, content := range bin.Content {
				if err := indexContent(batch, bin.ID, content); err != nil {
					panic(err)
				}
			}
		}
	}

	if err := index.Batch(batch); err != nil {
		panic(err)
	}

	fmt.Println("Done indexing!")

	return index
}

func createMapping() mapping.IndexMapping {
	// a generic reusable mapping for english text
	englishTextFieldMapping := bleve.NewTextFieldMapping()
	englishTextFieldMapping.Analyzer = en.AnalyzerName

	// a generic reusable mapping for keyword text
	keywordFieldMapping := bleve.NewTextFieldMapping()
	keywordFieldMapping.Analyzer = keyword.Name

	indexMapping := bleve.NewIndexMapping()
	indexMapping.AddDocumentMapping(model.Bolt{}.CreateMapping(englishTextFieldMapping))
	indexMapping.AddDocumentMapping(model.Washer{}.CreateMapping(englishTextFieldMapping))
	indexMapping.AddDocumentMapping(model.Screw{}.CreateMapping(englishTextFieldMapping))
	indexMapping.AddDocumentMapping(model.Nail{}.CreateMapping(englishTextFieldMapping))
	indexMapping.AddDocumentMapping(model.Nut{}.CreateMapping(englishTextFieldMapping))
	indexMapping.AddDocumentMapping(model.Simple{}.CreateMapping(englishTextFieldMapping))

	indexMapping.DefaultAnalyzer = "en"

	return indexMapping
}

func indexContent(batch *bleve.Batch, id string, content model.Content) error {
	switch content.Type {
	case model.ContentSimple:
		return batch.Index(id, content.Simple)
	case model.ContentBolt:
		return batch.Index(id, content.Bolt)
	case model.ContentNut:
		return batch.Index(id, content.Nail)
	case model.ContentWasher:
		return batch.Index(id, content.Washer)
	case model.ContentScrew:
		return batch.Index(id, content.Screw)
	case model.ContentNail:
		return batch.Index(id, content.Nail)
	case model.ContentEmpty:
		return nil
	default:
		return fmt.Errorf("unknown type: %s", content.Type)
	}
}
