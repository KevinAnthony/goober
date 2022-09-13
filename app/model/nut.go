package model

import (
	"time"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
)

var _ IContent = (*Nut)(nil)

type Nut struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.nut,alias:nut"`

	ID          string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID   string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt   time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	ThreadSize  string         `json:"thread_size" pg:"thread_size"`
	ThreadPitch string         `json:"thread_pitch" pg:"thread_pitch"`
	Type        NutType        `json:"type"  pg:"type,type:goober.nut_t"`
	Material    MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
}

func (s Nut) String() string {
	return ""
}

func (s Nut) BleveType() string {
	return "nut"
}

func (s Nut) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	boltMapping := bleve.NewDocumentMapping()

	boltMapping.AddFieldMappingsAt("type", fieldMapping)
	boltMapping.AddFieldMappingsAt("material", fieldMapping)

	return "nut", boltMapping
}
