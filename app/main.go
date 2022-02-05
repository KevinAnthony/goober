package main

import (
	"github.com/kevinanthony/goober/app/config"
	"github.com/kevinanthony/goober/app/handler"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/server"
	"github.com/kevinanthony/goober/app/service"
)

func main() {
	cfg, err := config.InitConfig()
	if err != nil {
		panic(err)
	}

	db, close := repository.NewMongo(cfg.Mongo)

	repo := repository.NewBin(db)
	svc := service.NewBin(repo)
	hdlr := handler.NewBin(svc)

	server.NewServer(hdlr).Run()

	close()
}
