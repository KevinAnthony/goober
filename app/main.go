package main

import (
	"github.com/kevinanthony/goober/app/config"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/server"
)

func main() {
	cfg, err := config.InitConfig()
	if err != nil {
		panic(err)
	}

	repository.NewMongo(cfg.Mongo)

	server.NewServer().Run()
}
