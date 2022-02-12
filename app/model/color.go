package model

type Color struct {
	R uint8 `json:"r"`
	G uint8 `json:"g"`
	B uint8 `json:"b"`
	A uint8 `json:"a"`
}

func NewColor(r, g, b int) Color {
	return Color{
		R: uint8(r),
		B: uint8(b),
		G: uint8(g),
		A: uint8(255),
	}
}
