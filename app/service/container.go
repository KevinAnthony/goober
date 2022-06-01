package service

import (
	"context"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/repository"
)

type Container interface {
	Create(ctx context.Context, container model.Container) (model.Container, error)
	GetAll(ctx context.Context) ([]model.Container, error)
	GetSingle(ctx context.Context, container model.Container) (model.Container, error)
	Update(ctx context.Context, container model.Container) (model.Container, error)
	Delete(ctx context.Context, id string) error
}

type container struct {
	containerRepo repository.Container
}

func NewContainer(repo repository.Container) Container {
	if repo == nil {
		panic("container repository is required")
	}

	return &container{
		containerRepo: repo,
	}
}

func (c container) Create(ctx context.Context, container model.Container) (model.Container, error) {
	return c.containerRepo.Create(ctx, container)
}

func (c container) GetAll(ctx context.Context) ([]model.Container, error) {
	return c.containerRepo.GetAll(ctx)
}

func (c container) GetSingle(ctx context.Context, container model.Container) (model.Container, error) {
	return c.containerRepo.GetSingle(ctx, container)
}

func (c container) Update(ctx context.Context, container model.Container) (model.Container, error) {
	return c.containerRepo.Update(ctx, container)
}

func (c container) Delete(ctx context.Context, id string) error {
	return c.containerRepo.Delete(ctx, id)
}
