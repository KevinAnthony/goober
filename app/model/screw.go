package model

import (
	"time"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/mapping"
)

var _ IContent = (*Screw)(nil)

type Screw struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.screw,alias:screw"`

	ID        string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Length    float32        `json:"length" pg:"length"`
	Size      string         `json:"size" pg:"size"`
	Type      ScrewType      `json:"type"  pg:"type,type:goober.screw_type_t"`
	Head      ScrewHeadType  `json:"head" pg:"head,type:goober.,type:goober.screw_head_t"`
	Drive     ScrewHeadDrive `json:"drive" pg:"drive,type:goober.screw_head_drive_t"`
	Material  MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
}

func (s Screw) String() string {
	return ""
}

func (s Screw) BleveType() string {
	return "screw"
}

func (s Screw) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	boltMapping := bleve.NewDocumentMapping()

	boltMapping.AddFieldMappingsAt("size", fieldMapping)
	boltMapping.AddFieldMappingsAt("length", fieldMapping)
	boltMapping.AddFieldMappingsAt("type", fieldMapping)
	boltMapping.AddFieldMappingsAt("head", fieldMapping)
	boltMapping.AddFieldMappingsAt("drive", fieldMapping)
	boltMapping.AddFieldMappingsAt("material", fieldMapping)

	return "screw", boltMapping
}
