package service

import (
	"context"

	"github.com/kevinanthony/goober/app/repository"
)

type Content interface {
	Delete(ctx context.Context, id string) error
}

type content struct {
	contentRepo repository.Content
}

func NewContent(repo repository.Content) Content {
	if repo == nil {
		panic("content repository is required")
	}

	return &content{
		contentRepo: repo,
	}
}

func (c content) Delete(ctx context.Context, id string) error {
	return c.contentRepo.Delete(ctx, id)
}
