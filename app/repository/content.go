package repository

import (
	"context"
	"github.com/go-pg/pg/v10"
	"github.com/kevinanthony/goober/app/model"
)

type Content interface {
	Delete(ctx context.Context, id string) error
}

type content struct {
	db *pg.DB
}

func NewContent(db *pg.DB) Content {
	if db == nil {
		panic("db connection is required")
	}
	return &content{
		db: db,
	}
}

func (c content) Delete(ctx context.Context, id string) error {
	content := model.Content{ID: id}

	_, err := c.db.Model(&content).WherePK().Context(ctx).Returning("*").Delete()

	return err
}
