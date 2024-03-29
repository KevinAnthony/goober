package service

import (
	"context"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"
	"github.com/kevinanthony/goober/app/searcher"
)

var empty = model.Bin{}

type Bin interface {
	Create(ctx context.Context, bin model.Bin) (model.Bin, error)
	Get(ctx context.Context, bin model.Bin) (model.Bin, error)
	Update(ctx context.Context, bin model.Bin) (model.Bin, error)
	Delete(ctx context.Context, bin model.Bin) error
}

type bin struct {
	binRepo repository.Bin
	search  searcher.Indexer
}

func NewBin(repo repository.Bin, search searcher.Indexer) Bin {
	if repo == nil {
		panic("bin repository is required")
	}
	if search == nil {
		panic("search indexer is required")
	}

	return &bin{
		binRepo: repo,
		search:  search,
	}
}

func (b bin) Create(ctx context.Context, bin model.Bin) (model.Bin, error) {
	bin, err := b.binRepo.Create(ctx, bin)
	if err != nil {
		return empty, err
	}

	if err := b.search.UpdateBin(bin); err != nil {
		return empty, err
	}

	return bin, nil
}

func (b bin) Get(ctx context.Context, bin model.Bin) (model.Bin, error) {
	return b.binRepo.Get(ctx, bin)
}

func (b bin) Update(ctx context.Context, bin model.Bin) (model.Bin, error) {
	bin, err := b.binRepo.Update(ctx, bin)
	if err != nil {
		return empty, err
	}

	if err := b.search.UpdateBin(bin); err != nil {
		return empty, err
	}

	return bin, nil
}

func (b bin) Delete(ctx context.Context, bin model.Bin) error {
	if err := b.binRepo.Delete(ctx, bin); err != nil {
		return err
	}

	return b.search.DeleteBin(bin)
}
