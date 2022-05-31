package model

import (
	"fmt"
	"time"

	"github.com/blevesearch/bleve/v2/mapping"
)

type Bin struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.bin,alias:bin"`

	ID           string     `json:"id" pg:"id,pk,type:uuid"`
	ContainerID  string     `json:"container_id" pg:"container_id,type:uuid"`
	CreatedAt    time.Time  `json:"created_at" pg:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at" pg:"updated_at"`
	DeletedAt    *time.Time `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Width        int        `json:"width" pg:"width,use_zero"`
	Height       int        `json:"height"  pg:"height,use_zero"`
	ColumnStartX int        `json:"column_start_x"  pg:"column_start_x,use_zero"`
	ColumnStartY int        `json:"column_start_y"  pg:"column_start_y,use_zero"`
	Color        Color      `json:"color"  pg:"color"`
	Unit         UnitType   `json:"unit"  pg:"unit,type:goober.unit_t"`
	Content      []Content  `json:"content" pg:"rel:has-many"`
}

type Content struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.content,alias:content"`

	ID        string      `json:"id" pg:"id,pk,type:uuid"`
	BinID     string      `json:"bin_id" pg:"bin_id,fk,type:uuid"`
	CreatedAt time.Time   `json:"created_at" pg:"created_at"`
	UpdatedAt time.Time   `json:"updated_at" pg:"updated_at"`
	DeletedAt *time.Time  `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Type      ContentType `json:"content_type"  pg:"content_type,type:goober.content_t"`
	Bolt      *Bolt       `json:"bolt,omitempty" pg:"rel:belongs-to"`
	Washer    *Washer     `json:"washer,omitempty" pg:"rel:belongs-to"`
	Screw     *Screw      `json:"screw,omitempty" pg:"rel:belongs-to"`
}

type IContent interface {
	fmt.Stringer
	// BleveType is the private BleveClassifier
	BleveType() string

	CreateMapping(fieldMapping *mapping.FieldMapping) (string, *mapping.DocumentMapping)
}
