package main

import (
	"github.com/kevinanthony/goober/app/config"
	"github.com/kevinanthony/goober/app/handler"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/searcher"
	"github.com/kevinanthony/goober/app/server"
	"github.com/kevinanthony/goober/app/service"
	"github.com/kevinanthony/gorps/http"
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
	contentRepo := repository.NewContent(db)

	indexer := searcher.NewIndexer(ctrRepo)

	binSvc := service.NewBin(binRepo, indexer)
	ctrSvc := service.NewContainer(ctrRepo)
	searchSvc := service.NewSearch(indexer, binRepo)
	contentSvc := service.NewContent(contentRepo)

	binHandler := handler.NewBin(reqh, binSvc)
	ctrHandler := handler.NewContainer(reqh, ctrSvc)
	searchHandler := handler.NewSearch(reqh, searchSvc)
	contentHandler := handler.Newcontent(reqh, contentSvc)

	server.NewServer(reqh, contentHandler, binHandler, ctrHandler, searchHandler).Run()
}
