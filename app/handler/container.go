package handler

import (
	"context"
	"net/http"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/service"
	rh "github.com/kevinanthony/gorps/http"
)

type Container interface {
	Create(ctx context.Context, r *http.Request) (interface{}, error)
	GetAll(ctx context.Context, r *http.Request) (interface{}, error)
	GetSingle(ctx context.Context, r *http.Request) (interface{}, error)
	Update(ctx context.Context, r *http.Request) (interface{}, error)
	Delete(ctx context.Context, r *http.Request) (interface{}, error)
}

type container struct {
	containerSvc service.Container
	rh           rh.RequestHandler
}

func NewContainer(reqHdlr rh.RequestHandler, bsvc service.Container) Container {
	if bsvc == nil {
		panic("container service is required")
	}
	return &container{
		rh:           reqHdlr,
		containerSvc: bsvc,
	}
}

func (c container) Create(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID   string          `path:"binID" validators:"required"`
		Body model.Container `body:"request"`
	}

	if err := c.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	return c.containerSvc.Create(ctx, req.Body)
}

func (c container) GetAll(ctx context.Context, r *http.Request) (interface{}, error) {
	return c.containerSvc.GetAll(r.Context())
}

func (c container) GetSingle(ctx context.Context, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}
func (c container) Update(ctx context.Context, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}

func (c container) Delete(ctx context.Context, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}
