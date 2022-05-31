package handler

import (
	"context"
	"fmt"
	"net/http"

	"github.com/kevinanthony/goober/app/service"
	rh "github.com/kevinanthony/gorps/http"

	_ "github.com/blevesearch/bleve/v2/mapping"
)

type Search interface {
	Find(ctx context.Context, r *http.Request) (interface{}, error)
}

type search struct {
	rh  rh.RequestHandler
	svc service.Search
}

func NewSearch(reqHdlr rh.RequestHandler, svc service.Search) Search {
	return search{
		svc: svc,
		rh:  reqHdlr,
	}
}

func (s search) Find(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		SearchText string `query:"text" validators:"required"`
	}

	if err := s.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	result, err := s.svc.Find(ctx, req.SearchText)
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}
	return result, nil
}
