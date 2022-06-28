package handler

import (
	"context"
	"fmt"
	"net/http"

	"github.com/kevinanthony/goober/app/model"
	"github.com/kevinanthony/goober/app/service"
	rh "github.com/kevinanthony/gorps/http"
)

type Bin interface {
	Create(ctx context.Context, r *http.Request) (interface{}, error)
	Get(ctx context.Context, r *http.Request) (interface{}, error)
	Update(ctx context.Context, r *http.Request) (interface{}, error)
	Delete(ctx context.Context, r *http.Request) (interface{}, error)
}

type bin struct {
	binSvc service.Bin
	rh     rh.RequestHandler
}

func NewBin(reqHdlr rh.RequestHandler, bsvc service.Bin) Bin {
	if reqHdlr == nil {
		panic("request handler is required")
	}
	if bsvc == nil {
		panic("bin service is required")
	}
	return &bin{
		rh:     reqHdlr,
		binSvc: bsvc,
	}
}

func (b bin) Create(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID   string    `path:"binID" validators:"required"`
		Body model.Bin `body:"request"`
	}

	if err := b.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	bin, err := b.binSvc.Create(ctx, req.Body)
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}
	return bin, nil
}

func (b bin) Get(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID string `path:"binID" validators:"required"`
	}
	if err := b.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	return b.binSvc.Get(ctx, model.Bin{ID: req.ID})
}

func (b bin) Update(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID   string    `path:"binID" validators:"required"`
		Body model.Bin `body:"request"`
	}

	if err := b.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	bin, err := b.binSvc.Update(ctx, req.Body)

	return bin, err
}

func (b bin) Delete(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID string `path:"binID" validators:"required"`
	}
	if err := b.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	return nil, b.binSvc.Delete(ctx, model.Bin{ID: req.ID})
}
