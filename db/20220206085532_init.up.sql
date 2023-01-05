BEGIN
;

CREATE SCHEMA IF NOT EXISTS goober
;

SET SEARCH_PATH TO goober
;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" with schema goober
;

CREATE TYPE
    unit_t
AS
    ENUM ('in','cm','mm','an');

CREATE TYPE
    content_t
AS
    ENUM ('bolt', 'screw', 'washer');

CREATE TYPE
    bolt_head_t
AS
    ENUM ('hex','cap','round', 'flat', 'tnut');

CREATE TYPE
    material_finish_t
AS
    ENUM ('stainless_steel','zinc', 'yellow_zinc', 'black_oxide');

CREATE TYPE
    washer_t
AS
    ENUM ('normal', 'fender', 'split_lock', 'thick');

CREATE TYPE
    screw_head_drive_t
AS
    ENUM ('external_hex', 'internal_hex','phillips', 't25');

CREATE TYPE
    screw_head_t
AS
    ENUM ('round','flat','hex');

CREATE TYPE
    screw_t
AS
    ENUM ('machine','wood','drywall', 'self_tapping');

CREATE OR REPLACE FUNCTION func_set_update_at()
    RETURNS trigger AS
$BODY$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$BODY$
    language PLPGSQL
;

CREATE TABLE IF NOT EXISTS container
(
    id UUID NOT NULL
        CONSTRAINT container_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    color JSONB,
    width INT NOT NULL,
    height INT NOT NULL,
    label text NOT NULL,
    unit unit_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS bin
(
    id UUID NOT NULL
        CONSTRAINT bin_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    container_id UUID NOT NULL,
    CONSTRAINT bin_to_container_fk
        FOREIGN KEY(container_id)
            REFERENCES container(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    width INT NOT NULL,
    height INT NOT NULL,
    column_start_x INT NOT NULL,
    column_start_y INT NOT NULL,
    color JSONB,
    unit unit_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS content
(
    id UUID NOT NULL
        CONSTRAINT content_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    bin_id UUID NOT NULL,
    CONSTRAINT content_to_bin_fk
        FOREIGN KEY(bin_id)
            REFERENCES bin(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    content_type content_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS bolt
(
    id UUID NOT NULL
        CONSTRAINT bolt_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT bolt_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    head bolt_head_t NOT NULL,
    length FLOAT NOT NULL,
    thread_size TEXT NOT NULL,
    thread_pitch TEXT NOT NULL,
    material material_finish_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS washer
(
    id UUID NOT NULL
        CONSTRAINT washer_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT washer_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    size TEXT NOT NULL,
    type washer_t NOT NULL,
    material material_finish_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS screw
(
    id UUID NOT NULL
        CONSTRAINT screw_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT screw_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    length FLOAT NOT NULL,
    size TEXT NOT NULL,
    type screw_t NOT NULL,
    head screw_head_t NOT NULL,
    drive screw_head_drive_t NOT NULL,
    material material_finish_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

COMMIT
;
