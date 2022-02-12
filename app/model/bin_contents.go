package model

import "time"

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
}

func (b Bolt) String() string {
	return ""
}

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

type Washer struct {
	//nolint:structcheck,unused
	tableName struct{} `pg:"goober.washer,alias:washer"`

	ID        string         `json:"id" pg:"id,pk,type:uuid"`
	ContentID string         `json:"content_id" pg:"content_id,fk,type:uuid"`
	CreatedAt time.Time      `json:"created_at" pg:"created_at"`
	UpdatedAt time.Time      `json:"updated_at" pg:"updated_at"`
	DeletedAt *time.Time     `json:"deleted_at" pg:"deleted_at,soft_delete"`
	Size      string         `json:"size" pg:"size"`
	Type      WasherType     `json:"type" pg:"type,type:goober.washer_t"`
	Material  MaterialFinish `json:"material" pg:"material,type:goober.material_finish_t"`
}

func (w Washer) String() string {
	return ""
}
