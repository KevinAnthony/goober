package repository

import (
	"context"

	"github.com/go-pg/pg/v10"
	"github.com/kevinanthony/goober/app/model"
	"github.com/pkg/errors"
)

type Bin interface {
	Create(ctx context.Context, bin model.Bin) (model.Bin, error)
	Get(ctx context.Context, bin model.Bin) (model.Bin, error)
	GetByID(ctx context.Context, ids ...string) ([]model.Bin, error)
	Update(ctx context.Context, bin model.Bin) (model.Bin, error)
	Delete(ctx context.Context, bin model.Bin) error
}

type bin struct {
	db *pg.DB
}

func NewBin(db *pg.DB) Bin {
	if db == nil {
		panic("db connection is required")
	}
	return &bin{
		db: db,
	}
}

func (b bin) Create(ctx context.Context, bin model.Bin) (model.Bin, error) {
	if err := b.db.RunInTransaction(ctx, func(tx *pg.Tx) error {
		_, err := tx.Model(&bin).Context(ctx).Returning("*").Insert(&bin)
		if err != nil {
			return errors.Wrap(err, "insert bin")
		}

		//todo own repos
		for _, content := range bin.Content {
			content.BinID = bin.ID
			if _, err := tx.Model(&content).Context(ctx).Returning("*").Insert(); err != nil {
				return errors.Wrap(err, "insert content")
			}

			if content.Bolt != nil {
				content.Bolt.ContentID = content.ID

				if _, err := tx.Model(content.Bolt).Context(ctx).Returning("*").Insert(); err != nil {
					return errors.Wrap(err, "insert bolt")
				}
			}

			if content.Screw != nil {
				content.Screw.ContentID = content.ID

				if _, err := tx.Model(content.Screw).Context(ctx).Returning("*").Insert(); err != nil {
					return errors.Wrap(err, "insert screw")
				}
			}

			if content.Washer != nil {
				content.Washer.ContentID = content.ID

				if _, err := tx.Model(content.Washer).Context(ctx).Returning("*").Insert(); err != nil {
					return errors.Wrap(err, "insert washer")
				}
			}
		}

		return nil
	}); err != nil {
		return model.Bin{}, err
	}

	return bin, nil
}

func (b bin) Get(ctx context.Context, bin model.Bin) (model.Bin, error) {
	err := b.db.
		Model(&bin).
		WherePK().
		Context(ctx).
		Returning("*").
		Relation("Content").
		Relation("Content.Bolt").
		Relation("Content.Washer").
		Relation("Content.Screw").
		Select(&bin)

	return bin, err
}

func (b bin) GetByID(ctx context.Context, ids ...string) ([]model.Bin, error) {
	bins := make([]model.Bin, 0, len(ids))
	for _, id := range ids {
		bins = append(bins, model.Bin{ID: id})
	}

	err := b.db.
		Model(&bins).
		WherePK().
		Context(ctx).
		Returning("*").
		Relation("Content").
		Relation("Content.Bolt").
		Relation("Content.Washer").
		Relation("Content.Screw").
		Select(&bins)

	return bins, err
}

func (b bin) Update(ctx context.Context, bin model.Bin) (model.Bin, error) {
	if err := b.db.RunInTransaction(ctx, func(tx *pg.Tx) error {
		_, err := tx.Model(&bin).WherePK().Context(ctx).Returning("*").UpdateNotZero()
		if err != nil {
			return err
		}
		//todo own repos
		for _, content := range bin.Content {
			if _, err := tx.Model(&content).WherePK().Context(ctx).Returning("*").UpdateNotZero(); err != nil {
				return errors.Wrap(err, "update content")
			}

			if content.Bolt != nil {
				if _, err := tx.Model(content.Bolt).WherePK().Context(ctx).Returning("*").UpdateNotZero(); err != nil {
					return errors.Wrap(err, "update bolt")
				}
			}

			if content.Screw != nil {
				if _, err := tx.Model(content.Screw).WherePK().Context(ctx).Returning("*").UpdateNotZero(); err != nil {
					return errors.Wrap(err, "update screw")
				}
			}

			if content.Washer != nil {
				if _, err := tx.Model(content.Washer).WherePK().Context(ctx).Returning("*").UpdateNotZero(); err != nil {
					return errors.Wrap(err, "update washer")
				}
			}
		}

		return nil
	}); err != nil {
		return model.Bin{}, err
	}

	return bin, nil
}

func (b bin) Delete(ctx context.Context, bin model.Bin) error {
	_, err := b.db.Model(&bin).WherePK().Context(ctx).Returning("*").Delete(&bin)

	return err
}
