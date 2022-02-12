package config

import "github.com/caarlos0/env/v6"

type AppConfig struct {
	Postgres Postgres
}

func InitConfig() (AppConfig, error) {
	var cfg AppConfig
	err := env.Parse(&cfg)

	return cfg, err
}
