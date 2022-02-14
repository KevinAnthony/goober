package model

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
	UnitInch       UnitType = "in"
	UnitCentimeter UnitType = "cm"
	UnitMillimeter UnitType = "mm"
	UnitAN         UnitType = "an"
)
const (
	ContentBolt   ContentType = "bolt"
	ContentScrew  ContentType = "screw"
	ContentWasher ContentType = "washer"
)
const (
	BoltHeadHex   BoltHeadType = "hex"
	BoltHeadCap   BoltHeadType = "cap"
	BoltHeadRound BoltHeadType = "round"
	BoltHeadFlat  BoltHeadType = "flat"
)
const (
	MaterialFinishStainless  MaterialFinish = "stainless_steel"
	MaterialFinishZinc       MaterialFinish = "zinc"
	MaterialFinishYellowZinc MaterialFinish = "yellow_zinc"
	MaterialFinishBlackOxide MaterialFinish = "black_oxide"
)
const (
	WasherNormal WasherType = "normal"
	WasherFender WasherType = "fender"
	WasherSplit  WasherType = "split_lock"
	WasherThick  WasherType = "thick"
)
const (
	ScrewTypeMachine     ScrewType = "machine"
	ScrewTypeWood        ScrewType = "wood"
	ScrewTypeDrywall     ScrewType = "drywall"
	ScrewTypeSelfTapping ScrewType = "self_tapping"
)
const (
	ScrewHeadTypeRound ScrewHeadType = "round"
	ScrewHeadTypeFlat  ScrewHeadType = "flat"
	ScrewHeadTypeHex   ScrewHeadType = "hex"
)
const (
	ScrewHeadDriveExtHex   ScrewHeadDrive = "external_hex"
	ScrewHeadDriveIntHex   ScrewHeadDrive = "internal_hex"
	ScrewHeadDrivePhillips ScrewHeadDrive = "phillips"
	ScrewHeadDriveT25      ScrewHeadDrive = "t25"
)