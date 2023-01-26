package model

import (
	"fmt"
	"time"
)

type Container struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.container,alias:container"`

	ID        string     `json:"id" pg:"id,pk,type:uuid"`
	CreatedAt time.Time  `json:"created_at" pg:"created_at"`
	UpdatedAt time.Time  `json:"updated_at" pg:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Color     Color      `json:"color" pg:"color"`
	Width     int        `json:"width" pg:"width"`
	Height    int        `json:"height" pg:"height"`
	Label     string     `json:"label" pg:"label"`
	Unit      UnitType   `json:"unit"  pg:"unit,type:goober.unit_t"`
	Bins      []Bin      `json:"bins" pg:"rel:has-many"`
}

func (c Container) String() string {
	return fmt.Sprintf("%s[%s]", c.Label, c.ID)
}
