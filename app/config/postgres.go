package config

import "time"

type Postgres struct {
	Host         string        `json:"host" env:"PG_HOSTNAME"`
	Port         int           `json:"port" env:"PG_PORT" envDefault:"5432"`
	User         string        `json:"user" env:"PG_USERNAME"`
	Password     string        `json:"-" env:"PG_PASSWORD"`
	Database     string        `json:"database" env:"PG_DATABASE"`
	Schema       string        `json:"schema" env:"PG_SCHEMA" envDefault:"public"`
	ReadTimeout  time.Duration `json:"read_timeout" env:"PG_READ_TIMEOUT" envDefault:"1s"`
	WriteTimeout time.Duration `json:"write_timeout" env:"PG_WRITE_TIMEOUT" envDefault:"1s"`
}
