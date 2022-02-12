package repository

import (
	"context"
	"github.com/go-pg/pg/v10"
	"github.com/kevinanthony/goober/app/model"
)

type Container interface {
	Create(ctx context.Context, container model.Container) (model.Container, error)
	GetSingle(ctx context.Context, container model.Container) (model.Container, error)
	GetAll(ctx context.Context) ([]model.Container, error)
	Update(ctx context.Context, container model.Container) (model.Container, error)
	Delete(ctx context.Context, container model.Container) error
}

type container struct {
	db *pg.DB
}

func NewContainer(db *pg.DB) Container {
	if db == nil {
		panic("db connection is required")
	}
	return &container{
		db: db,
	}
}

func (c container) Create(ctx context.Context, container model.Container) (model.Container, error) {
	_, err := c.db.Model(&container).Context(ctx).Returning("*").Insert()

	return container, err
}

func (c container) GetSingle(ctx context.Context, container model.Container) (model.Container, error) {
	err := c.db.Model(&container).Context(ctx).Returning("*").Select()

	return container, err
}

func (c container) GetAll(ctx context.Context) ([]model.Container, error) {
	var container []model.Container
	err := c.db.
		Model(&container).
		Relation("Bins").
		Relation("Bins.Content").
		Relation("Bins.Content.Bolt").
		Relation("Bins.Content.Washer").
		Relation("Bins.Content.Screw").
		Where("deleted_at is null").Context(ctx).Returning("*").Select()

	return container, err
}

func (c container) Update(ctx context.Context, container model.Container) (model.Container, error) {
	container.Bins = nil

	_, err := c.db.Model(&container).Context(ctx).Returning("*").Update()

	return container, err
}

func (c container) Delete(ctx context.Context, container model.Container) error {
	_, err := c.db.Model(&container).Context(ctx).Returning("*").Delete()

	return err
}
