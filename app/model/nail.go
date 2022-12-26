package model

import (
	"time"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
)

var _ IContent = (*Nail)(nil)

type Nail struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.nail,alias:nail"`

	ID          string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID   string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt   time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Length      float32        `json:"length" pg:"length"`
	Material    MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
	Gauge       string         `json:"gauge" pg:"gauge"`
	Description string         `json:"description" pg:"description"`
}

func (s Nail) String() string {
	return ""
}

func (s Nail) BleveType() string {
	return "nail"
}

func (s Nail) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	nailMapping := bleve.NewDocumentMapping()

	nailMapping.AddFieldMappingsAt("length", fieldMapping)
	nailMapping.AddFieldMappingsAt("gauge", fieldMapping)
	nailMapping.AddFieldMappingsAt("description", fieldMapping)
	nailMapping.AddFieldMappingsAt("material", fieldMapping)
	nailMapping.AddFieldMappingsAt("description", fieldMapping)

	return "nail", nailMapping
}
