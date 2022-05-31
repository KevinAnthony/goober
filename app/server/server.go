package server

import (
	native "net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/kevinanthony/goober/app/handler"
	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/gorps/http"
)

type HTTPServer struct {
	mux *chi.Mux
}

func NewServer(reqh http.RequestHandler, bin handler.Bin, ctr handler.Container, search handler.Search) HTTPServer {
	server := HTTPServer{
		mux: chi.NewRouter(),
	}
	server.mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	server.mux.Post("/bin", reqh.Handle(bin.Create))
	server.mux.Get("/bin/{binID}", reqh.Handle(bin.Get))
	server.mux.Put("/bin/{binID}", reqh.Handle(bin.Update))
	server.mux.Delete("/bin/{binID}", reqh.Handle(bin.Delete))

	server.mux.Get("/container/all", reqh.Handle(ctr.GetAll))
	server.mux.Post("/container", reqh.Handle(ctr.Create))
	server.mux.Get("/container/{containerID}", reqh.Handle(ctr.GetSingle))
	server.mux.Put("/container/{containerID}", reqh.Handle(ctr.Update))
	server.mux.Delete("/container/{containerID}", reqh.Handle(ctr.Delete))

	server.mux.Get("/search/bin", reqh.Handle(search.Find))

	return server
}

func (s HTTPServer) Run() {
	svr := &native.Server{
		Addr:    ":8080",
		Handler: s.mux,
	}

	svr.SetKeepAlivesEnabled(false)

	if err := svr.ListenAndServe(); err != nil {
		panic(err)
	}
}

func MockContainerData() []model.Container {
	return []model.Container{
		{
			Label:  "Box #0001",
			Width:  33,
			Height: 25,
			Unit:   model.UnitCentimeter,
			Color:  model.NewColor(6, 74, 108),
			Bins: []model.Bin{
				{
					Width:        5,
					Height:       5,
					ColumnStartX: 0,
					ColumnStartY: 0,
					Color:        model.NewColor(255, 0, 0),
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadCap,
								Length:      10,
								ThreadSize:  "M5",
								ThreadPitch: "0.8",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
					Unit: model.UnitMillimeter,
				},
				{
					Width:        5,
					Height:       5,
					ColumnStartX: 0,
					ColumnStartY: 5,
					Color:        model.NewColor(255, 0, 0),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      10,
								ThreadSize:  "M5",
								ThreadPitch: "0.8",
								Material:    model.MaterialFinishStainless,
							},
						},
					},
				},
				{
					Width:        5,
					Height:       5,
					ColumnStartX: 0,
					ColumnStartY: 10,
					Color:        model.NewColor(255, 0, 0),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      15,
								ThreadSize:  "M5",
								ThreadPitch: "0.8",
								Material:    model.MaterialFinishStainless,
							},
						},
					},
				},
				{
					Width:        5,
					Height:       5,
					ColumnStartX: 0,
					ColumnStartY: 15,
					Color:        model.NewColor(255, 0, 0),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      15,
								ThreadSize:  "M5",
								ThreadPitch: "0.8",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        5,
					Height:       5,
					ColumnStartX: 0,
					ColumnStartY: 20,
					Color:        model.NewColor(255, 0, 0),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentWasher,
							Washer: &model.Washer{
								Size:     "M5",
								Type:     model.WasherSplit,
								Material: model.MaterialFinishStainless,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       10,
					ColumnStartX: 5,
					ColumnStartY: 0,
					Color:        model.NewColor(0, 0, 255),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentWasher,
							Washer: &model.Washer{
								Size:     "M5",
								Type:     model.WasherFender,
								Material: model.MaterialFinishStainless,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       10,
					ColumnStartX: 5,
					ColumnStartY: 10,
					Color:        model.NewColor(0, 0, 255),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentWasher,
							Washer: &model.Washer{
								Size:     "M5",
								Type:     model.WasherNormal,
								Material: model.MaterialFinishStainless,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       5,
					ColumnStartX: 5,
					ColumnStartY: 20,
					Color:        model.NewColor(255, 255, 0),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      30,
								ThreadSize:  "M6",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       5,
					ColumnStartX: 15,
					ColumnStartY: 0,
					Color:        model.NewColor(255, 255, 0),
					Unit:         model.UnitInch,
					Content: []model.Content{
						{
							Type: model.ContentScrew,
							Screw: &model.Screw{
								Length:   30,
								Size:     "#8",
								Type:     model.ScrewTypeSelfTapping,
								Head:     model.ScrewHeadTypeHex,
								Drive:    model.ScrewHeadDriveExtHex,
								Material: model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       10,
					ColumnStartX: 15,
					ColumnStartY: 5,
					Color:        model.NewColor(0, 0, 255),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      10,
								ThreadSize:  "M6",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       10,
					ColumnStartX: 15,
					ColumnStartY: 15,
					Color:        model.NewColor(0, 0, 255),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      20,
								ThreadSize:  "M6",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        8,
					Height:       10,
					ColumnStartX: 25,
					ColumnStartY: 0,
					Color:        model.NewColor(128, 128, 128),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      15,
								ThreadSize:  "M6",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        8,
					Height:       5,
					ColumnStartX: 25,
					ColumnStartY: 10,
					Color:        model.NewColor(128, 128, 128),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      35,
								ThreadSize:  "M6",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
						},
					},
				},
				{
					Width:        8,
					Height:       10,
					ColumnStartX: 25,
					ColumnStartY: 15,
					Color:        model.NewColor(128, 128, 128),
					Unit:         model.UnitMillimeter,
					Content: []model.Content{
						{
							Type: model.ContentBolt,
							Bolt: &model.Bolt{
								Head:        model.BoltHeadHex,
								Length:      20,
								ThreadSize:  "M8",
								ThreadPitch: "1",
								Material:    model.MaterialFinishZinc,
							},
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
			Color:  model.NewColor(6, 74, 108),
			Bins: []model.Bin{
				{
					Width:        10,
					Height:       10,
					ColumnStartX: 0,
					ColumnStartY: 0,
					Color:        model.NewColor(255, 255, 0),
					Unit:         model.UnitInch,
					Content: []model.Content{
						{
							Type: model.ContentScrew,
							Screw: &model.Screw{

								Length:   5.0 / 16.0,
								Size:     "#9",
								Type:     model.ScrewTypeWood,
								Head:     model.ScrewHeadTypeFlat,
								Drive:    model.ScrewHeadDriveT25,
								Material: model.MaterialFinishYellowZinc,
							},
						},
					},
				},
				{
					Width:        10,
					Height:       15,
					ColumnStartX: 10,
					ColumnStartY: 0,
					Color:        model.NewColor(0, 255, 0),
					Unit:         model.UnitInch,
					Content: []model.Content{
						{
							Type: model.ContentScrew,
							Screw: &model.Screw{

								Length:   2.5,
								Size:     "#8",
								Type:     model.ScrewTypeDrywall,
								Head:     model.ScrewHeadTypeFlat,
								Drive:    model.ScrewHeadDrivePhillips,
								Material: model.MaterialFinishBlackOxide,
							},
						},
					},
				},
			},
		},
	}
}
