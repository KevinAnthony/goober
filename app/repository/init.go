package repository

import (
	"context"
	"fmt"

	_ "github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10"
	"github.com/kevinanthony/goober/app/config"
)

func GetDBConnection(cfg config.Postgres) *pg.DB {
	options := &pg.Options{
		Addr:         fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		User:         cfg.User,
		Password:     cfg.Password,
		Database:     cfg.Database,
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
	}
	options.OnConnect = func(ctx context.Context, cn *pg.Conn) error {
		_, err := cn.Exec("set search_path = ?", cfg.Schema)

		return err
	}

	conn := pg.Connect(options)
	if err := conn.Ping(context.Background()); err != nil {
		panic(err)
	}

	conn.AddQueryHook(&hook{})
	return conn
}

type hook struct{}

func (h hook) BeforeQuery(ctx context.Context, event *pg.QueryEvent) (context.Context, error) {
	query, _ := event.FormattedQuery()
	fmt.Println(string(query))
	return ctx, nil
}

func (h hook) AfterQuery(ctx context.Context, event *pg.QueryEvent) error {
	return nil
}
