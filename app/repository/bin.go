package repository

import (
	"context"

	"github.com/kevinanthony/goober/app/model"

	"github.com/go-pg/pg/v10"
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

			if content.Nut != nil {
				content.Nut.ContentID = content.ID

				if _, err := tx.Model(content.Nut).Context(ctx).Returning("*").Insert(); err != nil {
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

			if content.Nail != nil {
				content.Nail.ContentID = content.ID

				if _, err := tx.Model(content.Nail).Context(ctx).Returning("*").Insert(); err != nil {
					return errors.Wrap(err, "insert nail")
				}
			}

			if content.Simple != nil {
				content.Simple.ContentID = content.ID

				if _, err := tx.Model(content.Simple).Context(ctx).Returning("*").Insert(); err != nil {
					return errors.Wrap(err, "insert simple")
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
		Relation("Content.Nail").
		Relation("Content.Simple").
		Relation("Content.Nut").
		Select(&bin)

	return bin, err
}

func (b bin) GetByID(ctx context.Context, ids ...string) ([]model.Bin, error) {
	var bins []model.Bin

	err := b.db.
		Model(&bins).
		Where("id in (?)", pg.In(ids)).
		Context(ctx).
		Returning("*").
		Relation("Content").
		Relation("Content.Bolt").
		Relation("Content.Washer").
		Relation("Content.Screw").
		Relation("Content.Nail").
		Relation("Content.Simple").
		Relation("Content.Nut").
		Select()

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
				if len(content.Bolt.ContentID) == 0 {
					content.Bolt.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Bolt), content.Bolt.ID); err != nil {
					return errors.Wrap(err, "update bolt")
				}
			}

			if content.Screw != nil {
				if len(content.Screw.ContentID) == 0 {
					content.Screw.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Screw), content.Screw.ID); err != nil {
					return errors.Wrap(err, "update screw")
				}
			}

			if content.Washer != nil {
				if len(content.Washer.ContentID) == 0 {
					content.Washer.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Washer), content.Washer.ID); err != nil {
					return errors.Wrap(err, "update washer")
				}
			}

			if content.Nail != nil {
				if len(content.Nail.ContentID) == 0 {
					content.Nail.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Nail), content.Nail.ID); err != nil {
					return errors.Wrap(err, "update nail")
				}
			}

			if content.Nut != nil {
				if len(content.Nut.ContentID) == 0 {
					content.Nut.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Nut), content.Nut.ID); err != nil {
					return errors.Wrap(err, "update nut")
				}
			}

			if content.Simple != nil {
				if len(content.Simple.ContentID) == 0 {
					content.Simple.ContentID = content.ID
				}

				if err := doSubQuery(ctx, tx.Model(content.Simple), content.Simple.ID); err != nil {
					return errors.Wrap(err, "update simple")
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

func doSubQuery(ctx context.Context, q *pg.Query, id string) error {
	q = q.WherePK().Context(ctx).Returning("*")
	if len(id) == 0 {
		_, err := q.Insert()

		return err
	}

	_, err := q.UpdateNotZero()

	return err
}
