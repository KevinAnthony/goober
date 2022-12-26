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

	ID          string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID   string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt   time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Length      float32        `json:"length" pg:"length"`
	Size        string         `json:"size" pg:"size"`
	Type        ScrewType      `json:"type"  pg:"type,type:goober.screw_type_t"`
	Head        ScrewHeadType  `json:"head" pg:"head,type:goober.,type:goober.screw_head_t"`
	Drive       ScrewHeadDrive `json:"drive" pg:"drive,type:goober.screw_head_drive_t"`
	Material    MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
	Description string         `json:"description" pg:"description"`
}

func (s Screw) String() string {
	return ""
}

func (s Screw) BleveType() string {
	return "screw"
}

func (s Screw) CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping) {
	screwMapping := bleve.NewDocumentMapping()

	screwMapping.AddFieldMappingsAt("size", fieldMapping)
	screwMapping.AddFieldMappingsAt("length", fieldMapping)
	screwMapping.AddFieldMappingsAt("type", fieldMapping)
	screwMapping.AddFieldMappingsAt("head", fieldMapping)
	screwMapping.AddFieldMappingsAt("drive", fieldMapping)
	screwMapping.AddFieldMappingsAt("material", fieldMapping)
	screwMapping.AddFieldMappingsAt("description", fieldMapping)

	return "screw", screwMapping
}
