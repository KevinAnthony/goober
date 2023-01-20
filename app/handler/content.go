package handler

import (
	"context"
	"net/http"

	"github.com/kevinanthony/goober/app/service"
	rh "github.com/kevinanthony/gorps/http"
)

type Content interface {
	Delete(ctx context.Context, r *http.Request) (interface{}, error)
}

type content struct {
	contentSvc service.Content
	rh         rh.RequestHandler
}

func Newcontent(reqHdlr rh.RequestHandler, bsvc service.Content) Content {
	if bsvc == nil {
		panic("content service is required")
	}
	return &content{
		rh:         reqHdlr,
		contentSvc: bsvc,
	}
}

func (c content) Delete(ctx context.Context, r *http.Request) (interface{}, error) {
	var req struct {
		ID string `path:"contentID" validators:"required"`
	}

	if err := c.rh.MarshalAndVerify(r, &req); err != nil {
		return nil, err
	}

	return nil, c.contentSvc.Delete(ctx, req.ID)
}
