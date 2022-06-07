package model

import (
	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
	"time"
)

var _ IContent = (*Simple)(nil)

type Simple struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.Simple,alias:Simple"`

	ID        string     `json:"id" pg:"id,pk,type:uuid"`
	ContentID string     `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt time.Time  `json:"created_at" pg:"created_at"`
	UpdatedAt time.Time  `json:"updated_at" pg:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Text      string     `json:"text" pg:"text"`
}

func (s Simple) String() string {
	return s.Text
}

func (s Simple) BleveType() string {
	return "simple"
}

func (s Simple) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	mapping := bleve.NewDocumentMapping()

	mapping.AddFieldMappingsAt("text", fieldMapping)

	return "simple", mapping
}
