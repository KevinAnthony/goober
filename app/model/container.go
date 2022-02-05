package model

import "image/color"

type (
	UnitType       string
	ContentType    string
	BoltHeadType   string
	MaterialFinish string
	WasherType     string
	ScrewType      string
	ScrewHeadType  string
	ScrewHeadDrive string
)

const (
	UnitInch                 UnitType       = "in"
	UnitCentimeter                          = "cm"
	UnitMillimeter                          = "mm"
	ContentBolt              ContentType    = "bolt"
	ContentScrew                            = "screw"
	ContentWasher                           = "washer"
	BoltHeadHex              BoltHeadType   = "hex"
	BoltHeadCap                             = "cap"
	BoltHeadRound                           = "round"
	MaterialFinishStainless  MaterialFinish = "stainless_steel"
	MaterialFinishZinc                      = "zinc"
	MaterialFinishYellowZinc                = "yellow_zinc"
	MaterialFinishBlackOxide                = "black_oxide"
	WasherNormal             WasherType     = "normal"
	WasherFender                            = "fender"
	WasherSplit                             = "split_lock"
	ScrewTypeMachine         ScrewType      = "machine"
	ScrewTypeWood                           = "wood"
	ScrewTypeDrywall                        = "drywall"
	ScrewTypeSelfTapping                    = "self_tapping"
	ScrewHeadTypeRound       ScrewHeadType  = "round"
	ScrewHeadTypeFlat                       = "flat"
	ScrewHeadTypeHex                        = "hex"
	ScrewHeadDriveExtHex     ScrewHeadDrive = "external_hex"
	ScrewHeadDriveIntHex                    = "internal_hex"
	ScrewHeadDrivePhillips                  = "phillips"
	ScrewHeadDriveT25                       = "t25"
)

type Container struct {
	Color  color.Color `json:"color"`
	Width  int         `json:"width"`
	Height int         `json:"height"`
	Label  string      `json:"box"`
	Unit   UnitType    `json:"unit"`
	Bins   []Bin       `json:"bins"`
}

type Bin struct {
	Width     int         `json:"width"`
	Height    int         `json:"height"`
	PositionX int         `json:"start_x"`
	PositionY int         `json:"start_y"`
	Color     color.Color `json:"color"`
	Contents  Contents    `json:"content"`
}

type Contents struct {
	Unit   UnitType    `json:"unit"`
	Type   ContentType `json:"type"`
	Bolt   *Bolt       `json:"bolt,omitempty"`
	Washer *Washer     `json:"washer,omitempty"`
	Screw  *Screw      `json:"screw,omitempty"`
}

type Bolt struct {
	Head        BoltHeadType   `json:"head"`
	Length      float32        `json:"length"`
	ThreadSize  string         `json:"thread_size"`
	ThreadPitch string         `json:"thread_pitch"`
	Finish      MaterialFinish `json:"finish"`
}

type Screw struct {
	Length float32        `json:"length"`
	Size   string         `json:"size"`
	Type   ScrewType      `json:"type"`
	Head   ScrewHeadType  `json:"head"`
	Drive  ScrewHeadDrive `json:"drive"`
	Finish MaterialFinish `json:"finish"`
}

type Washer struct {
	Size   string         `json:"size"`
	Type   WasherType     `json:"type"`
	Finish MaterialFinish `json:"finish"`
}
