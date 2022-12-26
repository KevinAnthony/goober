package model

import (
	"time"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
)

var _ IContent = (*Bolt)(nil)

type Bolt struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.bolt,alias:bolt"`

	ID          string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID   string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt   time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Head        BoltHeadType   `json:"head" pg:"head,type:goober.bolt_head_t"`
	Length      float32        `json:"length" pg:"length"`
	ThreadSize  string         `json:"thread_size" pg:"thread_size"`
	ThreadPitch string         `json:"thread_pitch" pg:"thread_pitch"`
	Material    MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
	Description string         `json:"description" pg:"description"`
}

func (b Bolt) String() string {
	return ""
}

func (b Bolt) BleveType() string {
	return "bolt"
}

func (b Bolt) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	boltMapping := bleve.NewDocumentMapping()

	boltMapping.AddFieldMappingsAt("head", fieldMapping)
	boltMapping.AddFieldMappingsAt("length", fieldMapping)
	boltMapping.AddFieldMappingsAt("thread_size", fieldMapping)
	boltMapping.AddFieldMappingsAt("thread_pitch", fieldMapping)
	boltMapping.AddFieldMappingsAt("material", fieldMapping)
	boltMapping.AddFieldMappingsAt("description", fieldMapping)

	return "bolt", boltMapping
}
