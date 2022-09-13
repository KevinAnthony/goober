BEGIN
;

ALTER TYPE content_t ADD VALUE IF NOT EXISTS 'nut' AFTER 'nail'
;

CREATE TYPE
    nut_t
AS
    ENUM ('hex', 'flange', 'cap', 'nylock', 'wing', 'tee', 'specialty');

CREATE TABLE IF NOT EXISTS nut
(
    id UUID NOT NULL
        CONSTRAINT nut_ok
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT nut_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    description TEXT NOT NULL,
    thread_size TEXT NOT NULL,
    thread_pitch TEXT NOT NULL,
    type nut_t NOT NULL,
    material material_finish_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

COMMIT
;
