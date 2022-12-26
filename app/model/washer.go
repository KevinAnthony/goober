package model

import (
	"time"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
)

var _ IContent = (*Washer)(nil)

type Washer struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.washer,alias:washer"`

	ID          string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID   string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt   time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Size        string         `json:"size" pg:"size"`
	Type        WasherType     `json:"type" pg:"type,type:goober.washer_t"`
	Material    MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
	Description string         `json:"description" pg:"description"`
}

func (w Washer) String() string {
	return ""
}

func (w Washer) BleveType() string {
	return "washer"
}

func (w Washer) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	washerMapping := bleve.NewDocumentMapping()

	washerMapping.AddFieldMappingsAt("size", fieldMapping)
	washerMapping.AddFieldMappingsAt("type", fieldMapping)
	washerMapping.AddFieldMappingsAt("material", fieldMapping)
	washerMapping.AddFieldMappingsAt("description", fieldMapping)

	return "washer", washerMapping
}
