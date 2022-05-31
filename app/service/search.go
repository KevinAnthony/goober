package service

import (
	"context"
	"fmt"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/searcher"

	_ "github.com/blevesearch/bleve/v2/mapping"
)

type Search interface {
	Find(ctx context.Context, searchText string) ([]model.Bin, error)
}

type search struct {
	binsRepo repository.Bin
	indexer  searcher.Indexer
}

func NewSearch(indexer searcher.Indexer, binsRepo repository.Bin) Search {
	return search{
		indexer:  indexer,
		binsRepo: binsRepo,
	}
}

func (s search) Find(ctx context.Context, searchText string) ([]model.Bin, error) {
	ids, err := s.indexer.GetIDsFromTerm(ctx, searchText)
	if err != nil {
		return nil, err
	}
	fmt.Println(ids)
	if len(ids) == 0 {
		return nil, nil
	}

	return s.binsRepo.GetByID(ctx, ids...)
}
