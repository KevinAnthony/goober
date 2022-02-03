package server

import (
	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/gorps/http/encoder"
	"image/color"
	"net/http"

	goji "goji.io"
	"goji.io/pat"
)

type HTTPServer struct {
	mux *goji.Mux
}

func NewServer() HTTPServer {
	srv := HTTPServer{
		mux: goji.NewMux(),
	}
	srv.mux.HandleFunc(handle(http.MethodPost, "/container", getContainer))
	srv.mux.HandleFunc(handle(http.MethodGet, "/container", getContainer))
	srv.mux.HandleFunc(handle(http.MethodPost, "/container/bin", getContainer))
	return srv
}

func handle(method, path string, f func(w http.ResponseWriter, _ *http.Request)) (goji.Pattern, func(http.ResponseWriter, *http.Request)) {
	switch method {
	case http.MethodHead:
		return pat.Head(path), f
	case http.MethodPost:
		return pat.Post(path), f
	case http.MethodGet:
		return pat.Get(path), f
	case http.MethodPut:
		return pat.Put(path), f
	case http.MethodPatch:
		return pat.Patch(path), f
	case http.MethodDelete:
		return pat.Delete(path), f
	case http.MethodOptions:
		return pat.Options(path), f
	default:
		panic("unknown or unsupported http method: " + method)
	}
}

func (s HTTPServer) Run() {
	svr := &http.Server{
		Addr:    ":8080",
		Handler: s.mux,
	}

	svr.SetKeepAlivesEnabled(false)

	if err := svr.ListenAndServe(); err != nil {
		panic(err)
	}
}

func getContainer(w http.ResponseWriter, _ *http.Request) {
	containers := []model.Container{
		{
			Label:  "Box #0001",
			Width:  33,
			Height: 25,
			Unit:   model.UnitCentimeter,
			Color:  color.RGBA{R: 6, G: 74, B: 108, A: 255},
			Bins: []model.Bin{
				{
					Width:     5,
					Height:    5,
					PositionX: 0,
					PositionY: 0,
					Color:     color.RGBA{R: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadCap,
							Length:      10,
							ThreadSize:  "M5",
							ThreadPitch: "0.8",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     5,
					Height:    5,
					PositionX: 0,
					PositionY: 5,
					Color:     color.RGBA{R: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      10,
							ThreadSize:  "M5",
							ThreadPitch: "0.8",
							Finish:      model.MaterialFinishStainless,
						},
					},
				},
				{
					Width:     5,
					Height:    5,
					PositionX: 0,
					PositionY: 10,
					Color:     color.RGBA{R: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      15,
							ThreadSize:  "M5",
							ThreadPitch: "0.8",
							Finish:      model.MaterialFinishStainless,
						},
					},
				},
				{
					Width:     5,
					Height:    5,
					PositionX: 0,
					PositionY: 15,
					Color:     color.RGBA{R: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      15,
							ThreadSize:  "M5",
							ThreadPitch: "0.8",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     5,
					Height:    5,
					PositionX: 0,
					PositionY: 20,
					Color:     color.RGBA{R: 255},
					Contents: model.Contents{
						Type: model.ContentWasher,
						Washer: &model.Washer{
							Unit:   model.UnitMillimeter,
							Size:   "M5",
							Type:   model.WasherSplit,
							Finish: model.MaterialFinishStainless,
						},
					},
				},
				{
					Width:     10,
					Height:    10,
					PositionX: 5,
					PositionY: 0,
					Color:     color.RGBA{B: 255},
					Contents: model.Contents{
						Type: model.ContentWasher,
						Washer: &model.Washer{
							Unit:   model.UnitMillimeter,
							Size:   "M5",
							Type:   model.WasherFender,
							Finish: model.MaterialFinishStainless,
						},
					},
				},
				{
					Width:     10,
					Height:    10,
					PositionX: 5,
					PositionY: 10,
					Color:     color.RGBA{B: 255},
					Contents: model.Contents{
						Type: model.ContentWasher,
						Washer: &model.Washer{
							Unit:   model.UnitMillimeter,
							Size:   "M5",
							Type:   model.WasherNormal,
							Finish: model.MaterialFinishStainless,
						},
					},
				},
				{
					Width:     10,
					Height:    5,
					PositionX: 5,
					PositionY: 20,
					Color:     color.RGBA{R: 255, G: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      30,
							ThreadSize:  "M6",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     10,
					Height:    5,
					PositionX: 15,
					PositionY: 0,
					Color:     color.RGBA{R: 255, G: 255},
					Contents: model.Contents{
						Type: model.ContentScrew,
						Screw: &model.Screw{
							Unit:   model.UnitInch,
							Length: 30,
							Size:   "#8",
							Type:   model.ScrewTypeSelfTapping,
							Head:   model.ScrewHeadTypeHex,
							Drive:  model.ScrewHeadDriveExtHex,
							Finish: model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     10,
					Height:    10,
					PositionX: 15,
					PositionY: 5,
					Color:     color.RGBA{B: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      10,
							ThreadSize:  "M6",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     10,
					Height:    10,
					PositionX: 15,
					PositionY: 15,
					Color:     color.RGBA{B: 255},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      20,
							ThreadSize:  "M6",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     8,
					Height:    10,
					PositionX: 25,
					PositionY: 0,
					Color:     color.RGBA{R: 128, G: 128, B: 128},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      15,
							ThreadSize:  "M6",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     8,
					Height:    5,
					PositionX: 25,
					PositionY: 10,
					Color:     color.RGBA{R: 128, G: 128, B: 128},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      35,
							ThreadSize:  "M6",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
				{
					Width:     8,
					Height:    10,
					PositionX: 25,
					PositionY: 15,
					Color:     color.RGBA{R: 128, G: 128, B: 128},
					Contents: model.Contents{
						Type: model.ContentBolt,
						Bolt: &model.Bolt{
							Unit:        model.UnitMillimeter,
							Head:        model.BoltHeadHex,
							Length:      20,
							ThreadSize:  "M8",
							ThreadPitch: "1",
							Finish:      model.MaterialFinishZinc,
						},
					},
				},
			},
		},
		{
			Label:  "Box #0002",
			Width:  33,
			Height: 25,
			Unit:   model.UnitCentimeter,
			Color:  color.RGBA{R: 6, G: 74, B: 108, A: 255},
			Bins: []model.Bin{
				{
					Width:     10,
					Height:    10,
					PositionX: 0,
					PositionY: 0,
					Color:     color.RGBA{R: 255, G: 255},
					Contents: model.Contents{
						Type: model.ContentScrew,
						Screw: &model.Screw{
							Unit:   model.UnitInch,
							Length: 5.0 / 16.0,
							Size:   "#9",
							Type:   model.ScrewTypeWood,
							Head:   model.ScrewHeadTypeFlat,
							Drive:  model.ScrewHeadDriveT25,
							Finish: model.MaterialFinishYellowZinc,
						},
					},
				},
				{
					Width:     10,
					Height:    15,
					PositionX: 10,
					PositionY: 0,
					Color:     color.RGBA{G: 255},
					Contents: model.Contents{
						Type: model.ContentScrew,
						Screw: &model.Screw{
							Unit:   model.UnitInch,
							Length: 2.5,
							Size:   "#8",
							Type:   model.ScrewTypeDrywall,
							Head:   model.ScrewHeadTypeFlat,
							Drive:  model.ScrewHeadDrivePhillips,
							Finish: model.MaterialFinishBlackOxide,
						},
					},
				},
			},
		},
	}
	bts, err := encoder.NewJSON().Encode(containers)

	if err != nil {
		_, _ = w.Write([]byte(err.Error()))
	}

	w.Header().Set("Contents-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(bts)
}
