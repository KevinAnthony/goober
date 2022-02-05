package handler

import (
	"github.com/kevinanthony/goober/app/service"
	"net/http"
)

type Bin interface {
	Create(_ http.ResponseWriter, r *http.Request) (interface{}, error)
	Get(_ http.ResponseWriter, r *http.Request) (interface{}, error)
	Update(_ http.ResponseWriter, r *http.Request) (interface{}, error)
	Delete(_ http.ResponseWriter, r *http.Request) (interface{}, error)
}

type bin struct {
	binSvc service.Bin
}

func NewBin(bsvc service.Bin) Bin {
	if bsvc == nil {
		panic("bin service is required")
	}
	return &bin{
		binSvc: bsvc,
	}
}

func (b bin) Create(_ http.ResponseWriter, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Get(_ http.ResponseWriter, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Update(_ http.ResponseWriter, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}

func (b bin) Delete(_ http.ResponseWriter, r *http.Request) (interface{}, error) {
	//TODO implement me
	panic("implement me")
}
