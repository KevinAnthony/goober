package service

import (
	"context"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"
)

type Bin interface {
	Create(ctx context.Context, bin model.Bin) (model.Bin, error)
	Get(ctx context.Context, bin model.Bin) (model.Bin, error)
	Update(ctx context.Context, bin model.Bin) (model.Bin, error)
	Delete(ctx context.Context, bin model.Bin) error
}

type bin struct {
	binRepo repository.Bin
}

func NewBin(repo repository.Bin) Bin {
	if repo == nil {
		panic("bin repository is required")
	}

	return &bin{
		binRepo: repo,
	}
}

func (b bin) Create(ctx context.Context, bin model.Bin) (model.Bin, error) {
	return b.binRepo.Create(ctx, bin)
}

func (b bin) Get(ctx context.Context, bin model.Bin) (model.Bin, error) {
	return b.binRepo.Get(ctx, bin)
}

func (b bin) Update(ctx context.Context, bin model.Bin) (model.Bin, error) {
	return b.binRepo.Update(ctx, bin)
}

func (b bin) Delete(ctx context.Context, bin model.Bin) error {
	return b.binRepo.Delete(ctx, bin)
}
