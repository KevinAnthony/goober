package repository

import (
	"context"
	"github.com/kevinanthony/goober/app/model"
)

type Bin interface {
	Create(ctx context.Context, bin model.Bin) (model.Bin, error)
	Get(ctx context.Context, bin model.Bin) (model.Bin, error)
	Update(ctx context.Context, bin model.Bin) (model.Bin, error)
	Delete(ctx context.Context, bin model.Bin) error
}

type bin struct {
	db Connection
}

func NewBin(db Connection) Bin {
	if db == nil {
		panic("db connection is required")
	}
	return &bin{
		db: db,
	}
}

func (b bin) Create(ctx context.Context, bin model.Bin) (model.Bin, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Get(ctx context.Context, bin model.Bin) (model.Bin, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Update(ctx context.Context, bin model.Bin) (model.Bin, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Delete(ctx context.Context, bin model.Bin) error {
	//TODO implement me
	panic("implement me")
}
