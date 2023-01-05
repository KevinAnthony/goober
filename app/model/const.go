package model

type (
	UnitType       string
	ContentType    string
	BoltHeadType   string
	MaterialFinish string
	NutType        string
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
	ContentEmpty  ContentType = "empty"
	ContentSimple ContentType = "simple"
	ContentBolt   ContentType = "bolt"
	ContentScrew  ContentType = "screw"
	ContentWasher ContentType = "washer"
	ContentNail   ContentType = "nail"
	ContentNut    ContentType = "nut"
)
const (
	BoltHeadHex      BoltHeadType = "hex"
	BoltHeadCap      BoltHeadType = "cap"
	BoltHeadRound    BoltHeadType = "round"
	BoltHeadFlat     BoltHeadType = "flat"
	BoltHeadTNut     BoltHeadType = "tnut"
	BoltHeadFlange   BoltHeadType = "flange"
	BoltHeadCarriage BoltHeadType = "carriage"
)
const (
	MaterialFinishStainless      MaterialFinish = "stainless_steel"
	MaterialFinishBrass          MaterialFinish = "brass"
	MaterialFinishZinc           MaterialFinish = "zinc"
	MaterialFinishYellowZinc     MaterialFinish = "yellow_zinc"
	MaterialFinishBlackOxide     MaterialFinish = "black_oxide"
	MaterialFinishBlackPhosphate MaterialFinish = "black_phosphate"
	MaterialFinishBright         MaterialFinish = "bright"
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
	ScrewHeadDriveSlotted  ScrewHeadDrive = "slotted"
	ScrewHeadDriveT25      ScrewHeadDrive = "t25"
)

const (
	NutTypeHex       NutType = "hex"
	NutTypeFlange    NutType = "flange"
	NutTypeCap       NutType = "cap"
	NutTypeNyLock    NutType = "nylock"
	NutTypeWing      NutType = "wing"
	NutTypeTee       NutType = "tee"
	NutTypeSpecialty NutType = "specialty"
	NutTypeCoupling  NutType = "coupling"
)
