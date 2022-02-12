package main

import (
	"context"
	"fmt"
	"sort"

	"github.com/kevinanthony/goober/app/config"
	"github.com/kevinanthony/goober/app/handler"
	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/server"
	"github.com/kevinanthony/goober/app/service"
	"github.com/kevinanthony/gorps/http"

	"github.com/go-pg/pg/v10"
)

func main() {
	cfg, err := config.InitConfig()
	if err != nil {
		panic(err)
	}

	reqh := http.NewRequestHandler(http.NewRequestHandlerHelper())

	db := repository.GetDBConnection(cfg.Postgres)

	binRepo := repository.NewBin(db)
	ctrRepo := repository.NewContainer(db)

	binSvc := service.NewBin(binRepo)
	ctrSvc := service.NewContainer(ctrRepo)

	binHandler := handler.NewBin(reqh, binSvc)
	ctrHandler := handler.NewContainer(reqh, ctrSvc)

	loadMockData(db, ctrRepo, binRepo)

	server.NewServer(reqh, binHandler, ctrHandler).Run()
}

func loadMockData(db *pg.DB, ctrRepo repository.Container, binRepo repository.Bin) {
	ctx := context.Background()

	_, err := db.Exec("truncate table container cascade;")
	if err != nil {
		panic(err)
	}

	containers := server.MockContainerData()
	for i, container := range containers {
		newContainer, err := ctrRepo.Create(ctx, container)
		if err != nil {
			panic(err)
		}

		for _, bin := range container.Bins {
			bin.ContainerID = newContainer.ID
			_, err = binRepo.Create(ctx, bin)
			if err != nil {
				panic(err)
			}
		}
		containers[i].Bins = ksort(containers[i].Bins)
	}

	newList, err := ctrRepo.GetAll(ctx)
	if err != nil {
		panic(err)
	}
	for i := range newList {
		newList[i].Bins = ksort(newList[i].Bins)
	}
}

func ksort(bins []model.Bin) []model.Bin {
	sort.Slice(bins, func(i, j int) bool {
		return kstring(bins[i]) > kstring(bins[j])
	})

	return bins
}

func kstring(bin model.Bin) string {
	return fmt.Sprintf("%d %d %d %d", bin.ColumnStartX, bin.ColumnStartY, bin.Width, bin.Height)
}
