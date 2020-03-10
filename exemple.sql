CREATE SCHEMA IF NOT EXISTS vegadatabase;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users_roles CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS users_languages CASCADE;
DROP TABLE IF EXISTS meetup_states CASCADE;
DROP TABLE IF EXISTS meetups CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS meetups_topics CASCADE;
DROP TABLE IF EXISTS meetups_users CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS articles_topics CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS filters CASCADE;
DROP TABLE IF EXISTS filters_topics CASCADE;
DROP TABLE IF EXISTS notification_types CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS complaints CASCADE;

CREATE TABLE users
(
    id         BIGSERIAL NOT NULL,
    login      TEXT      NOT NULL UNIQUE,
    email      TEXT      NOT NULL UNIQUE,
    password   TEXT      NOT NULL,
    first_name TEXT      NULL,
    last_name  TEXT      NULL,
    active     BOOLEAN   NOT NULL DEFAULT TRUE,
    about      TEXT      NULL,
    rate       REAL      NULL
        CONSTRAINT rate_range CHECK (rate >= 0 AND rate <= 5),
    num_rates INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE roles
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE users_roles
(
    id_user BIGINT  NOT NULL,
    id_role INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_role) REFERENCES roles (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_user, id_role)
);

CREATE TABLE languages
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE users_languages
(
    id_user     BIGINT  NOT NULL,
    id_language INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_language) REFERENCES languages (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_user, id_language)
);

CREATE TABLE meetup_states
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE meetups
(
    id                  BIGSERIAL NOT NULL,
    id_speaker          BIGINT    NOT NULL,
    id_language         INTEGER   NOT NULL,
    id_topic            BIGINT    NOT NULL,
    id_state            INTEGER   NOT NULL DEFAULT 2,
    title               TEXT      NOT NULL,
    start_time          TIMESTAMP NOT NULL,
    duration_minutes    SMALLINT  NOT NULL,
    min_attendees       INTEGER   NOT NULL DEFAULT 1,
    max_attendees       INTEGER   NOT NULL,
    description         TEXT      NULL,
    FOREIGN KEY (id_speaker) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_language) REFERENCES languages (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_state) REFERENCES meetup_states (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE topics
(
    id   BIGSERIAL NOT NULL,
    name TEXT      NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE meetups_users
(
    id_meetup        BIGINT    NOT NULL,
    id_user          BIGINT    NOT NULL,
    speaker_rate     SMALLINT  NULL,
    speaker_feedback TEXT      NULL,
    time_posted      TIMESTAMP NULL,
    FOREIGN KEY (id_meetup) REFERENCES meetups (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_meetup, id_user)
);

CREATE TABLE subscriptions
(
    id_speaker BIGINT NOT NULL,
    id_user    BIGINT NOT NULL,
    FOREIGN KEY (id_speaker) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_speaker, id_user)
);

CREATE TABLE articles
(
    id          BIGSERIAL NOT NULL,
    id_author   BIGINT    NOT NULL,
    id_title    TEXT      NOT NULL,
    contents    TEXT      NOT NULL,
    time_posted TIMESTAMP NOT NULL,
    FOREIGN KEY (id_author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE articles_topics
(
    id_article BIGINT NOT NULL,
    id_topic   BIGINT NOT NULL,
    FOREIGN KEY (id_article) REFERENCES articles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_topic) REFERENCES topics (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_article, id_topic)
);

CREATE TABLE comments
(
    id          BIGSERIAL NOT NULL,
    id_author   BIGINT    NOT NULL,
    id_article  BIGINT    NOT NULL,
    contents    TEXT      NOT NULL,
    time_posted TIMESTAMP NOT NULL,
    FOREIGN KEY (id_author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_article) REFERENCES articles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE badges
(
    id     SERIAL NOT NULL,
    name   TEXT   NOT NULL,
    script TEXT   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE filters
(
    id              BIGSERIAL   NOT NULL,
    id_user         BIGINT      NOT NULL,
    name            TEXT        NOT NULL,
    id_language     INTEGER     NULL,
    rate_from       REAL        NULL,
    rate_to         REAL        NULL,
    time_from       TIMESTAMP   NULL,
    time_to         TIMESTAMP   NULL,
    title_substring TEXT        NULL,
    id_topic BIGINT NOT NULL DEFAULT 1,

FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_language) REFERENCES languages (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE filters_topics
(
    id_filter BIGINT NOT NULL,
    id_topic  BIGINT NOT NULL,
    FOREIGN KEY (id_filter) REFERENCES filters (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_topic) REFERENCES topics (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_filter, id_topic)
);

CREATE TABLE notification_types
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE notifications
(
    id              BIGSERIAL   NOT NULL,
    message         TEXT        NOT NULL,
    id_user         BIGINT      NOT NULL,
    read            BOOLEAN     NOT NULL DEFAULT FALSE,
    id_type         INTEGER     NOT NULL,
    time_created    TIMESTAMP   NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_type) REFERENCES notification_types (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE complaints
(
    id              BIGSERIAL   NOT NULL,
    reason          TEXT        NOT NULL,
    time_posted     TIMESTAMP   NOT NULL,
    id_source       BIGINT      NOT NULL,
    id_destination  BIGINT      NOT NULL,
    read            BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_source) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_destination) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);