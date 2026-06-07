--
-- PostgreSQL database dump
--

\restrict ZvqTD0cskSTkFpjENa691yR0X3s4MrF7fbLuh8yEsTGj4CYclApjWW5L5aJSTjC

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Courses_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Courses_status" AS ENUM (
    'В разработке',
    'Готов',
    'Не актуален'
);


ALTER TYPE public."enum_Courses_status" OWNER TO postgres;

--
-- Name: enum_Lessons_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Lessons_status" AS ENUM (
    'В разработке',
    'Готов',
    'Не актуален'
);


ALTER TYPE public."enum_Lessons_status" OWNER TO postgres;

--
-- Name: enum_Lessons_test; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Lessons_test" AS ENUM (
    'да',
    'нет'
);


ALTER TYPE public."enum_Lessons_test" OWNER TO postgres;

--
-- Name: enum_Payments_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Payments_status" AS ENUM (
    'Успешна',
    'Не прошла',
    'Возврат'
);


ALTER TYPE public."enum_Payments_status" OWNER TO postgres;

--
-- Name: enum_Questions_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Questions_type" AS ENUM (
    'single',
    'multiple',
    'text'
);


ALTER TYPE public."enum_Questions_type" OWNER TO postgres;

--
-- Name: enum_Tests_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Tests_status" AS ENUM (
    'В разработке',
    'Готов',
    'Не актуален'
);


ALTER TYPE public."enum_Tests_status" OWNER TO postgres;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'USER',
    'TEACHER',
    'ADMINISTRATOR',
    'Пользователь',
    'Преподаватель',
    'Администратор'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answers" (
    id integer NOT NULL,
    text text NOT NULL,
    is_correct boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    question_id integer
);


ALTER TABLE public."Answers" OWNER TO postgres;

--
-- Name: Answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Answers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Answers_id_seq" OWNER TO postgres;

--
-- Name: Answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Answers_id_seq" OWNED BY public."Answers".id;


--
-- Name: CourseReviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CourseReviews" (
    id integer NOT NULL,
    text text,
    rating integer,
    review_date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    course_id integer
);


ALTER TABLE public."CourseReviews" OWNER TO postgres;

--
-- Name: CourseReviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CourseReviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CourseReviews_id_seq" OWNER TO postgres;

--
-- Name: CourseReviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CourseReviews_id_seq" OWNED BY public."CourseReviews".id;


--
-- Name: Courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    price numeric(10,2),
    difficulty character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    description text NOT NULL,
    mini_description character varying(255) NOT NULL,
    number_lessons integer NOT NULL,
    image character varying(255),
    rating numeric(3,2) DEFAULT 0,
    status character varying(255) NOT NULL,
    created_date timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    creator_id integer NOT NULL
);


ALTER TABLE public."Courses" OWNER TO postgres;

--
-- Name: Courses_Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses_Users" (
    id integer NOT NULL,
    lessons_completed integer DEFAULT 0,
    enrollment_date timestamp with time zone NOT NULL,
    expiration_date timestamp with time zone,
    completed boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    course_id integer
);


ALTER TABLE public."Courses_Users" OWNER TO postgres;

--
-- Name: Courses_Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Courses_Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Courses_Users_id_seq" OWNER TO postgres;

--
-- Name: Courses_Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Courses_Users_id_seq" OWNED BY public."Courses_Users".id;


--
-- Name: Courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Courses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Courses_id_seq" OWNER TO postgres;

--
-- Name: Courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Courses_id_seq" OWNED BY public."Courses".id;


--
-- Name: Lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lessons" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text,
    video character varying(255),
    order_number integer NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    course_id integer,
    test public."enum_Lessons_test" DEFAULT 'нет'::public."enum_Lessons_test" NOT NULL
);


ALTER TABLE public."Lessons" OWNER TO postgres;

--
-- Name: Lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Lessons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Lessons_id_seq" OWNER TO postgres;

--
-- Name: Lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Lessons_id_seq" OWNED BY public."Lessons".id;


--
-- Name: Payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payments" (
    id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    status character varying(255) NOT NULL,
    payment_date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    course_id integer
);


ALTER TABLE public."Payments" OWNER TO postgres;

--
-- Name: Payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payments_id_seq" OWNER TO postgres;

--
-- Name: Payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payments_id_seq" OWNED BY public."Payments".id;


--
-- Name: Questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Questions" (
    id integer NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    test_id integer,
    type public."enum_Questions_type" DEFAULT 'single'::public."enum_Questions_type" NOT NULL
);


ALTER TABLE public."Questions" OWNER TO postgres;

--
-- Name: Questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Questions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Questions_id_seq" OWNER TO postgres;

--
-- Name: Questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Questions_id_seq" OWNED BY public."Questions".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tests" (
    id integer NOT NULL,
    passing_percentage integer NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    lesson_id integer
);


ALTER TABLE public."Tests" OWNER TO postgres;

--
-- Name: Tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tests_id_seq" OWNER TO postgres;

--
-- Name: Tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tests_id_seq" OWNED BY public."Tests".id;


--
-- Name: UserProgresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProgresses" (
    id integer NOT NULL,
    completed boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    lesson_id integer
);


ALTER TABLE public."UserProgresses" OWNER TO postgres;

--
-- Name: UserProgresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserProgresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserProgresses_id_seq" OWNER TO postgres;

--
-- Name: UserProgresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserProgresses_id_seq" OWNED BY public."UserProgresses".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    password character varying(255),
    email character varying(255),
    role character varying(255) DEFAULT 'USER'::character varying,
    avatar character varying(255) DEFAULT 'assets/images/default-avatar.png'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "refreshToken" character varying(255)
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers" ALTER COLUMN id SET DEFAULT nextval('public."Answers_id_seq"'::regclass);


--
-- Name: CourseReviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseReviews" ALTER COLUMN id SET DEFAULT nextval('public."CourseReviews_id_seq"'::regclass);


--
-- Name: Courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses" ALTER COLUMN id SET DEFAULT nextval('public."Courses_id_seq"'::regclass);


--
-- Name: Courses_Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses_Users" ALTER COLUMN id SET DEFAULT nextval('public."Courses_Users_id_seq"'::regclass);


--
-- Name: Lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons" ALTER COLUMN id SET DEFAULT nextval('public."Lessons_id_seq"'::regclass);


--
-- Name: Payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments" ALTER COLUMN id SET DEFAULT nextval('public."Payments_id_seq"'::regclass);


--
-- Name: Questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions" ALTER COLUMN id SET DEFAULT nextval('public."Questions_id_seq"'::regclass);


--
-- Name: Tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tests" ALTER COLUMN id SET DEFAULT nextval('public."Tests_id_seq"'::regclass);


--
-- Name: UserProgresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProgresses" ALTER COLUMN id SET DEFAULT nextval('public."UserProgresses_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answers" (id, text, is_correct, "createdAt", "updatedAt", question_id) FROM stdin;
1	Платформа 1С:Предприятие	t	2026-01-30 22:05:48.179691+03	2026-01-30 22:05:48.179691+03	4
2	Конфигурация (например, 1С:Бухгалтерия)	f	2026-01-30 22:05:48.179691+03	2026-01-30 22:05:48.179691+03	4
3	Отчетная подсистема	f	2026-01-30 22:05:48.179691+03	2026-01-30 22:05:48.179691+03	4
4	Хранят списки однотипных данных (товары, контрагенты, сотрудники)	t	2026-01-30 22:07:31.20489+03	2026-01-30 22:07:31.20489+03	5
5	Формируют бухгалтерские проводки	f	2026-01-30 22:07:31.20489+03	2026-01-30 22:07:31.20489+03	5
6	Показывают итоговые результаты работы	f	2026-01-30 22:07:31.20489+03	2026-01-30 22:07:31.20489+03	5
7	Используется только для хранения справочной информации	f	2026-01-30 22:09:48.615524+03	2026-01-30 22:09:48.615524+03	6
8	Фиксирует события и изменяет учет	t	2026-01-30 22:09:48.615524+03	2026-01-30 22:09:48.615524+03	6
9	Служит только для просмотра данных	f	2026-01-30 22:09:48.615524+03	2026-01-30 22:09:48.615524+03	6
10	В разделе «Продажи»	f	2026-01-30 22:11:21.762356+03	2026-01-30 22:11:21.762356+03	7
11	В главном меню «Файл»	f	2026-01-30 22:11:21.762356+03	2026-01-30 22:11:21.762356+03	7
12	В разделе «Отчеты»	t	2026-01-30 22:11:21.762356+03	2026-01-30 22:11:21.762356+03	7
13	Форма → отчет → справочник → документ	f	2026-01-30 22:12:27.979106+03	2026-01-30 22:12:27.979106+03	8
14	Раздел → список → форма → запись или проведение → возврат в список	t	2026-01-30 22:12:27.979106+03	2026-01-30 22:12:27.979106+03	8
15	Главное меню → настройки → отчет → закрытие программы	f	2026-01-30 22:12:27.979106+03	2026-01-30 22:12:27.979106+03	8
16	Платформа определяет, как выглядит интерфейс программы	t	2026-02-02 13:09:15.02812+03	2026-02-02 13:09:15.02812+03	9
17	Платформа хранит отчеты конкретной компании	f	2026-02-02 13:09:15.02812+03	2026-02-02 13:09:15.02812+03	9
18	Платформа является фундаментом для конфигураций	t	2026-02-02 13:09:15.02812+03	2026-02-02 13:09:15.02812+03	9
19	Платформа используется только бухгалтерами	f	2026-02-02 13:09:15.02812+03	2026-02-02 13:09:15.02812+03	9
20	Формировать бухгалтерские проводки	f	2026-02-02 13:11:03.193696+03	2026-02-02 13:11:03.193696+03	10
21	Искать записи с помощью строки поиска	t	2026-02-02 13:11:03.193696+03	2026-02-02 13:11:03.193696+03	10
22	Создавать и открывать элементы и документы	t	2026-02-02 13:11:03.193696+03	2026-02-02 13:11:03.193696+03	10
23	Настраивать структуру базы данных	f	2026-02-02 13:11:03.193696+03	2026-02-02 13:11:03.193696+03	10
24	результат	t	2026-02-02 13:13:40.909388+03	2026-02-02 13:13:40.909388+03	11
55	Это не верный ответ	f	2026-05-07 13:19:14.634+03	2026-05-07 13:19:14.634+03	26
56	Это не верный ответ	f	2026-05-07 13:19:14.636+03	2026-05-07 13:19:14.636+03	26
57	Это верный ответ	t	2026-05-07 13:19:14.637+03	2026-05-07 13:19:14.637+03	26
58	Это не верный ответ	f	2026-05-07 13:19:14.64+03	2026-05-07 13:19:14.64+03	27
59	Это верный ответ	t	2026-05-07 13:19:14.64+03	2026-05-07 13:19:14.64+03	27
60	Это не верный ответ	f	2026-05-07 13:19:14.642+03	2026-05-07 13:19:14.642+03	27
61	Это верный ответ	t	2026-05-07 13:19:14.642+03	2026-05-07 13:19:14.642+03	27
62	текстовым	t	2026-05-07 13:19:14.644+03	2026-05-07 13:19:14.644+03	28
63	готово	t	2026-05-07 13:20:13.547+03	2026-05-07 13:20:13.547+03	29
64	ка3ка	t	2026-05-07 20:10:52.516+03	2026-05-07 20:10:52.516+03	30
65	ава	f	2026-05-07 20:10:52.518+03	2026-05-07 20:10:52.518+03	30
66	ауауа	f	2026-05-07 20:10:52.519+03	2026-05-07 20:10:52.519+03	30
67	апрауп	t	2026-05-07 20:10:52.521+03	2026-05-07 20:10:52.521+03	31
68	апауп	t	2026-05-07 20:10:52.522+03	2026-05-07 20:10:52.522+03	31
69	апуа	f	2026-05-07 20:10:52.523+03	2026-05-07 20:10:52.523+03	31
70	апа	f	2026-05-07 20:10:52.524+03	2026-05-07 20:10:52.524+03	31
\.


--
-- Data for Name: CourseReviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CourseReviews" (id, text, rating, review_date, "createdAt", "updatedAt", user_id, course_id) FROM stdin;
\.


--
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Courses" (id, title, price, difficulty, type, description, mini_description, number_lessons, image, rating, status, created_date, "createdAt", "updatedAt", creator_id) FROM stdin;
7	1С для бухгалтеров	3500.00	Средний	Для пользователей	Практический курс по работе бухгалтеров в 1С.	Практический курс по работе бухгалтеров в 1С.	6	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
8	Кадровый учёт в 1С	3000.00	Средний	Для пользователей	Ведение кадрового учёта и документов в 1С.	Ведение кадрового учёта и документов в 1С.	5	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
9	Зарплата и кадры	4000.00	Средний	Для пользователей	Расчёт заработной платы в 1С.	Расчёт заработной платы в 1С.	7	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
5	Введение в 1С	\N	Лёгкий	Для пользователей	Это базовый курс для начинающих пользователей, работающих с учетными системами, в первую очередь для бухгалтеров, экономистов, кадровых специалистов и других сотрудников, использующих 1С в повседневной работе.\n\nКурс предназначен для тех, кто только начинает знакомство с программами 1С или хочет систематизировать уже имеющиеся знания. В теоретической части рассматриваются основы платформы 1С с точки зрения пользователя: назначение и возможности системы, структура интерфейса, основные объекты и принципы работы, навигация, ввод и просмотр данных, а также общая логика работы в типовых конфигурациях.\n\nПосле изучения теории участники проходят тест, который помогает закрепить материал и проверить понимание ключевых понятий и принципов работы в 1С.\n\nПо итогам курса участник будет понимать, как устроена платформа 1С, уверенно ориентироваться в интерфейсе и осознанно выполнять базовые пользовательские операции, необходимые для дальнейшей работы или изучения более специализированных курсов.	Базовый курс для пользователей 1С: знакомство с платформой, интерфейсом и принципами работы.	3	\N	4.50	Готов	2025-12-30 13:45:44.653+03	2025-12-30 13:45:44.653+03	2025-12-30 13:45:44.653+03	1
10	1С: управление торговлей	5000.00	Средний	Для пользователей	Учёт продаж, закупок и складов.	Учёт продаж, закупок и складов.	8	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
11	Первичные документы в 1С	\N	Лёгкий	Для пользователей	Работа с накладными, счетами и актами.	Работа с накладными, счетами и актами.	4	\N	4.40	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
12	Отчёты в 1С	2500.00	Средний	Для пользователей	Формирование и анализ отчётов.	Формирование и анализ отчётов.	5	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
13	1С для начинающих пользователей	\N	Лёгкий	Для пользователей	Стартовый курс для новичков.	Стартовый курс для новичков.	3	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
14	Учет ТМЦ в 1С	3200.00	Средний	Для пользователей	Учёт материальных ценностей.	Учёт материальных ценностей.	6	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
15	Инвентаризация в 1С	2800.00	Средний	Для пользователей	Проведение инвентаризаций.	Проведение инвентаризаций.	4	\N	4.40	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
16	Введение в программирование 1С	4500.00	Лёгкий	Для программистов	Основы языка и среды разработки 1С.	Основы языка и среды разработки 1С.	6	\N	4.80	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
17	Язык запросов 1С	6000.00	Средний	Для программистов	Работа с запросами и выборками данных.	Работа с запросами и выборками данных.	7	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
18	Управляемые формы	5500.00	Средний	Для программистов	Создание современных интерфейсов.	Создание современных интерфейсов.	6	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
21	Расширения конфигураций	6500.00	Средний	Для программистов	Работа с расширениями.	Работа с расширениями.	6	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
28	Резервное копирование	3500.00	Средний	Для администраторов	Настройка бэкапов.	Настройка бэкапов.	4	\N	4.40	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
31	Мониторинг системы	4500.00	Средний	Для администраторов	Контроль работы системы.	Контроль работы системы.	5	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
32	Новый курс по аналитике 1С	6000.00	Средний	Для программистов	Курс находится в разработке.	Курс находится в разработке.	6	\N	0.00	В разработке	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
23	Отладка и логирование	5000.00	Средний	Для программистов	Поиск и исправление ошибок.	Поиск и исправление ошибок.	5	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
26	Администрирование 1С	5000.00	Средний	Для администраторов	Основы администрирования платформы.	Основы администрирования платформы.	6	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
27	Установка и обновление 1С	4000.00	Лёгкий	Для администраторов	Установка платформы и конфигураций.	Установка платформы и конфигураций.	4	\N	4.50	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
19	Обмен данными в 1С	7000.00	Сложный	Для программистов	Настройка обменов между системами.	Настройка обменов между системами.	8	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
20	Оптимизация кода 1С	8000.00	Сложный	Для программистов	Повышение производительности.	Повышение производительности.	9	\N	4.80	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
22	HTTP и Web-сервисы	9000.00	Сложный	Для программистов	Интеграция через HTTP.	Интеграция через HTTP.	8	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
24	Разработка отчётов СКД	7500.00	Сложный	Для программистов	Система компоновки данных.	Система компоновки данных.	8	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
25	Безопасность в 1С	8500.00	Сложный	Для программистов	Права доступа и защита данных.	Права доступа и защита данных.	7	\N	4.60	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
33	Продвинутые отчёты	5500.00	Средний	Для пользователей	Курс в разработке.	Курс в разработке.	5	\N	0.00	В разработке	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
35	Старая версия 1С 7.7	\N	Лёгкий	Для пользователей	Устаревший курс.	Устаревший курс.	3	\N	3.80	Не актуален	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	1
36	Администрирование 1С 8.0	\N	Средний	Для администраторов	Курс устарел.	Курс устарел.	4	\N	3.90	Не актуален	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
37	Программирование в 1С 8.1	\N	Средний	Для программистов	Устаревший материал.	Устаревший материал.	5	\N	4.00	Не актуален	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	4
29	Производительность сервера 1С	7000.00	Сложный	Для администраторов	Оптимизация серверной части.	Оптимизация серверной части.	7	\N	4.70	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
30	Кластеры серверов 1С	9000.00	Сложный	Для администраторов	Работа с кластерами.	Работа с кластерами.	8	\N	4.80	Готов	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
34	Администрирование Linux для 1С	8000.00	Сложный	Для администраторов	Курс в разработке.	Курс в разработке.	7	\N	0.00	В разработке	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	2025-12-30 15:10:42.58861+03	3
78	Тест новой маханники	\N	Лёгкий	Для пользователей	укпке	укп	1	\N	4.50	В разработке	2026-05-07 19:43:43.16+03	2026-05-07 19:43:43.16+03	2026-05-07 19:51:17.126+03	4
77	Этот урок создан через конструктор	\N	Лёгкий	Для программистов	Полноценное описание урока: Сегодня умерла мама. А может быть, вчера – не знаю. Я получил из богадельни телеграмму: «Мать скончалась. Похороны завтра. Искренне соболезнуем». Это ничего не говорит – может быть, вчера умерла.\r\nБогадельня для стариков находится в Маренго, в восьмидесяти километрах от Алжира. Отправлюсь двухчасовым автобусом, буду там в конце дня. Значит, смогу провести ночь возле тела, а завтра к вечеру вернуться. Я попросил у патрона отпуск на два дня, и он не мог мне отказать, раз такая уважительная причина. Но видно было, что он недоволен. Я даже сказал ему: «Это ведь не по моей вине». Он не ответил, и я подумал, что зря так сказал. В общем, незачем было извиняться. Скорее уж, ему следовало выразить мне сочувствие. Но, вероятно, он сделает это послезавтра, когда увидит меня в трауре. А сейчас-то мама как будто и не умерла еще. После похорон, наоборот, все будет кончено и примет официальный характер.	Мини описание для урока	5	be6d05da-f550-4d71-afaa-51d7d764a381.jpg	4.50	Готов	2026-05-07 13:14:56.177+03	2026-05-07 13:14:56.178+03	2026-05-07 13:20:14.558+03	4
79	Тест новой механики 2	\N	Лёгкий	Для пользователей	авмвацм	авм	3	\N	4.50	В разработке	2026-05-07 20:01:45.353+03	2026-05-07 20:01:45.353+03	2026-05-07 20:10:52.199+03	4
\.


--
-- Data for Name: Courses_Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Courses_Users" (id, lessons_completed, enrollment_date, expiration_date, completed, "createdAt", "updatedAt", user_id, course_id) FROM stdin;
5	0	2026-02-18 19:02:18.423+03	\N	f	2026-02-18 19:02:18.423+03	2026-02-18 19:02:18.423+03	5	9
10	0	2026-02-18 19:07:07.469+03	\N	f	2026-02-18 19:07:07.469+03	2026-02-18 19:07:07.469+03	5	12
15	1	2026-03-09 21:59:40.638+03	\N	f	2026-03-09 21:59:40.638+03	2026-03-09 22:03:32.177+03	6	24
16	0	2026-03-10 22:21:13.942+03	\N	f	2026-03-10 22:21:13.943+03	2026-03-10 22:21:13.943+03	6	28
22	3	2026-03-16 22:38:27.952+03	\N	t	2026-03-16 22:38:27.953+03	2026-03-16 22:41:35.432+03	9	5
23	2	2026-04-12 12:58:16.018+03	\N	f	2026-04-12 12:58:16.018+03	2026-04-12 12:58:21.811+03	10	5
24	1	2026-04-21 22:22:19.379+03	\N	f	2026-04-21 22:22:19.379+03	2026-04-21 22:22:19.379+03	11	10
25	3	2026-04-21 22:22:37.963+03	\N	t	2026-04-21 22:22:37.963+03	2026-04-21 22:23:37.488+03	11	5
14	2	2026-02-26 21:52:14.419+03	\N	f	2026-02-26 21:52:14.419+03	2026-05-06 11:59:47.324+03	6	5
2	3	2026-02-18 14:07:38.005+03	\N	f	2026-02-18 14:07:38.006+03	2026-05-24 19:21:35.96+03	5	5
31	5	2026-05-07 13:20:47.17+03	\N	t	2026-05-07 13:20:47.17+03	2026-06-04 13:49:36.861+03	5	77
\.


--
-- Data for Name: Lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lessons" (id, title, content, video, order_number, status, "createdAt", "updatedAt", course_id, test) FROM stdin;
3	Как ориентироваться в 1С: навигация, списки и формы	#Зачем разбираться в интерфейсе#\\n\\nВо втором уроке мы переходим от понимания логики 1С к практической ориентации в программе. Если в первом уроке мы разобрались, что такое справочники, документы и отчеты, то теперь научимся быстро находить их в интерфейсе. Это как научиться читать карту: вы перестанете «бродить наугад» и начнете уверенно двигаться к нужному месту.#Разделы программы как рабочие зоны#\\n\\nИнтерфейс 1С обычно поделен на разделы: «Продажи», «Покупки», «Склад», «Банк и касса», «Зарплата», «Отчеты» и так далее. Каждый раздел — это набор инструментов для конкретного типа задач. Если вы работаете с реализацией товаров, логично идти в «Продажи», если ищете отчет — в «Отчеты». Со временем у вас выработается привычка: задача → нужный раздел.#Главное меню и панель функций#\\n\\nВ верхней части программы находится главное меню. Через него можно открыть любые объекты системы, даже если вы не знаете, в каком разделе они лежат. Это универсальный способ доступа ко всему. Чуть ниже или рядом обычно располагается панель команд, где появляются основные кнопки для текущего объекта: «Создать», «Изменить», «Провести», «Закрыть».#Списки как центр повседневной работы#\\n\\nПочти вся работа в 1С начинается со списков. Список — это таблица, в которой вы видите все элементы справочника или все документы одного типа. Например, список «Контрагенты» или список документов «Реализация товаров». Из списка вы создаете новые элементы, открываете существующие, ищете нужные записи и анализируете информацию.#Поиск и отбор данных в списках#\\n\\nКогда данных становится много, важно уметь их находить. В списках есть строка поиска и механизмы отбора. Поиск помогает быстро найти запись по названию или номеру, а отбор позволяет сузить список по условиям: например, показать документы только за этот месяц или только по конкретному контрагенту. Это один из ключевых навыков для быстрой работы.#Формы как место ввода и редактирования данных#\\n\\nКогда вы открываете элемент справочника или документ, перед вами появляется форма. Форма — это «лицо» объекта, место, где вы вводите и изменяете данные. Поля, флажки, списки выбора, табличные части — все это элементы формы. Важно понять, что форма не страшная и не сложная: это просто удобный способ заполнить нужную информацию.#Кнопки формы и их логика#\\n\\nВнизу или вверху формы обычно есть основные кнопки: «Записать», «Провести», «Закрыть». «Записать» сохраняет введенные данные, «Провести» — дополнительно отражает документ в учете, а «Закрыть» завершает работу с формой. Освоив смысл этих кнопок, вы перестанете бояться «что-то сломать» в системе.#Как не теряться в открытых окнах#\\n\\nВ 1С можно открыть сразу много списков и форм. Для этого существует рабочая область и вкладки. Каждая форма открывается как отдельная вкладка, и вы можете быстро между ними переключаться. Это похоже на вкладки в браузере: важно иногда закрывать лишние, чтобы не путаться.#Типовой маршрут пользователя#\\n\\nОбычно работа выглядит так: вы заходите в нужный раздел, открываете список, находите или создаете объект, заполняете форму, записываете или проводите документ и возвращаетесь обратно в список. Этот маршрут повторяется десятки раз в день и очень быстро становится автоматическим.#Подготовка к тесту#\\n\\nПосле этого урока вас будет ждать тест по материалам первого и второго занятий. В нем будут проверяться базовые вещи: понимание, что такое платформа и конфигурация, различие между справочниками, документами и отчетами, а также умение ориентироваться в интерфейсе, разделах, списках и формах. Поэтому важно не просто прочитать уроки, а осмыслить общую логику работы в 1С.#Главный вывод второго урока#\\n\\nИнтерфейс 1С — это не хаотичный набор окон и кнопок, а логичная система: разделы ведут к спискам, списки открывают формы, а формы позволяют работать с данными. Вместе с первым уроком это формирует прочный фундамент, без которого дальше будет сложно уверенно работать в программе.#Что будет дальше#\\n\\nСразу после этого урока вы пройдете тест по первым двум темам, чтобы закрепить базовые знания. А уже после теста в следующем уроке мы перейдем к практике: начнем работать со справочниками, научимся создавать и заполнять элементы, а также разберем типичные ошибки начинающих пользователей.	74fa51d5-94b2-41e5-9138-5c3bef3be08a.mp4	2	Готов	2026-01-27 19:26:45.201+03	2026-01-27 19:26:45.201+03	5	нет
2	Что такое 1С и как с этим работать	#Зачем начинать с основ, а не с кнопок#\\n\\nЭтот первый урок — наша отправная точка. Мы не будем сразу нажимать кнопки. Сначала мы разберемся, что такое 1С, как он устроен в основе и почему он выглядит и работает именно так. Понимание этих основ избавит вас от чувства «белки в колесе» и превратит из пассивного исполнителя в осознанного пользователя.#Платформа как фундамент всей системы#  \\n\\nПервое и самое важное: «1С» — это в первую очередь платформа или «движок». А уже на этом движке создаются конкретные конфигурации, то есть готовые программы для разных задач. Платформа 1С:Предприятие — это фундамент. Она определяет, как программа выглядит, как хранятся данные, как строится интерфейс. Вы ее как бы «не видите», но она везде.#Конфигурации как готовые решения для работы#\\n\\nКонфигурация — это уже готовое прикладное решение для вашей работы. Например, «1С:Бухгалтерия» для бухгалтеров, «1С:Зарплата и управление персоналом» для кадровиков или «1С:Управление торговлей» для менеджеров. Представьте, что платформа — это смартфон, а конфигурации — это приложения, которые вы на него устанавливаете. Один инструмент, но множество возможностей.#Единое информационное пространство компании#\\n\\nГлавная цель всей системы — создавать единое информационное пространство для компании и автоматизировать рутину. Благодаря этому бухгалтер видит накладную, которую провел менеджер, а директор в отчете сразу видит итоги продаж и расчеты по зарплате. Данные не дублируются на бумаге, а живут и передаются внутри системы.#Три ключевых типа объектов в 1С#\\n\\nС точки зрения пользователя, в 1С вы постоянно будете взаимодействовать с тремя основными типами объектов. Это справочники, документы и отчеты.#Справочники, документы и отчеты: кто за что отвечает# \\n\\nСправочники — это списки однотипных данных, основа вашей базы. В них вы заносите контрагентов, товары, сотрудников. Документы — это события, которые меняют учет: выставленный счет, проведенная накладная, приказ о приеме на работу. Документы проводятся, и эта проводка формирует записи в отчетах. Отчеты — это итог, возможность посмотреть и проанализировать результаты работы: оборотно-сальдовую ведомость, анализ продаж или расчетную ведомость.#Основной рабочий цикл в 1С#\\n\\nДавайте представим простую аналогию работы. Сначала вы заполняете «базу знаний» — вносите все товары в справочник «Номенклатура». Потом в работе каждую отгрузку оформляете документом «Реализация товаров». А в конце месяца открываете отчет «Обороты по товарам», чтобы увидеть, что и сколько было продано. Это и есть основной цикл: справочники → документы → отчеты.#Базовая ориентация в интерфейсе программы#\\n\\nКогда вы впервые откроете программу, ваш взгляд, скорее всего, упадет на несколько ключевых элементов интерфейса. Это главное меню вверху, панель разделов (часто слева) с основными блоками работы, такими как «Продажи», «Покупки», «Зарплата», и большая рабочая область, где открываются все списки и формы. Ваша первоначальная задача — научиться ориентироваться в этих разделах, чтобы находить нужные вам документы и отчеты.#Главный вывод первого урока# \\n\\nИтак, главный итог первого урока. 1С — это мощная платформа для автоматизации, построенная на четкой логике: справочники хранят данные, документы фиксируют события, а отчеты показывают результат. Понимая эту логику, вы перестаете просто кликать по кнопкам и начинаете осознанно находить нужные инструменты для своей задачи.#Что будет дальше#\\n\\nВ следующем уроке мы углубимся в навигацию и детально разберем интерфейс: как искать данные, как пользоваться формами ввода и работать со списками.	\N	1	Готов	2026-01-26 13:43:29.401+03	2026-01-26 13:43:29.401+03	5	нет
5	Тестирование по пройденному материалу	\N	\N	3	Готов	2026-01-30 21:28:08.654+03	2026-01-30 21:28:08.654+03	5	да
88	Это первый урок сделанный через конструктор	#Что то интересное#В день тридцатилетия личной жизни Вощеву дали расчет с небольшого механического завода, где он добывал средства для своего существования. В увольнительном документе ему написали, что он устраняется с производства вследствие роста слабосильности в нем и задумчивости среди общего темпа труда.#Что то интересно 2#В день тридцатилетия личной жизни Вощеву дали расчет с небольшого механического завода, где он добывал средства для своего существования.с производства вследствие роста слабосильности в нем и задумчивости среди общего темпа труда.#Что то интересное 3#В день тридцатилетия личной жизни Вощеву дали расчет с небольшого механического завода, где он добывал средства для своего существования. В увольнительном документе ему написали, что он устраняется с производства вследствие роста слабосильности в нем и задумчивости среди общего темпа труда.В день тридцатилетия личной жизни Вощеву дали расчет с небольшого механического завода, где он добывал средства для своего существования. В увольнительном документе ему написали, что он устраняется с производства вследствие роста слабосильности в нем и задумчивости среди общего темпа труда.	\N	1	Готов	2026-05-07 13:16:54.747+03	2026-05-07 13:20:14.561+03	77	нет
89	Это второй урок	#Что то интересное#В день тридцатилетия личной жизни Вощеву дали расчет с небольшого механического завода, где он добывал средства для своего существования. В увольнительном документе ему написали, что он устраняется с производства вследствие роста слабосильности в нем и задумчивости среди общего темпа труда.	2b360637-a022-4e46-8767-01e4ec275009.mp4	2	Готов	2026-05-07 13:17:23.011+03	2026-05-07 13:20:14.561+03	77	нет
90	Это первый тест		\N	3	Готов	2026-05-07 13:19:14.36+03	2026-05-07 13:20:14.561+03	77	да
91	Это последний урок	#Ура#Это не верный ответЭто не верный ответЭто не верный ответЭто не верный ответЭто не верный ответЭто не верный ответЭто не верный ответЭто не верный ответЭто не верный ответ	5ae782eb-08cd-4287-82a3-1113b02c4167.mp4	4	Готов	2026-05-07 13:19:42.74+03	2026-05-07 13:20:14.561+03	77	нет
92	Это последний тест		\N	5	Готов	2026-05-07 13:20:13.279+03	2026-05-07 13:20:14.561+03	77	да
93	Это не сработало	#васвв#вввввввмукмукм#укмукм#укмукм#укмук#укмукм	\N	1	В разработке	2026-05-07 19:51:17.083+03	2026-05-07 19:51:17.083+03	78	нет
94	Первый пробный урок	#вамцепм#укамукмукм	6571cf63-5aba-4ab7-b8c6-b8bc6e3322bd.mp4	1	В разработке	2026-05-07 20:03:08.026+03	2026-05-07 20:03:08.026+03	79	нет
95	Ура это на конец то работает	#Кроуто#теперь видно только меня	\N	2	В разработке	2026-05-07 20:10:00.584+03	2026-05-07 20:10:00.584+03	79	нет
96	Теперь для меня		\N	3	В разработке	2026-05-07 20:10:52.165+03	2026-05-07 20:10:52.165+03	79	да
\.


--
-- Data for Name: Payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payments" (id, amount, status, payment_date, "createdAt", "updatedAt", user_id, course_id) FROM stdin;
\.


--
-- Data for Name: Questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Questions" (id, text, "createdAt", "updatedAt", test_id, type) FROM stdin;
1	Для чего нужен 1С?	2025-12-20 21:49:49.55+03	2025-12-20 21:49:49.55+03	\N	single
2	Что такое документация?	2025-12-20 21:51:39.579+03	2025-12-20 21:51:39.579+03	\N	single
3	Что такое оборот документов?	2025-12-28 19:50:55.855+03	2025-12-28 19:50:55.855+03	\N	single
4	Что в системе 1С является фундаментом, на котором создаются прикладные решения?	2026-01-30 22:01:57.886814+03	2026-01-30 22:01:57.886814+03	3	single
5	Какую основную роль выполняют справочники в 1С?	2026-01-30 22:01:57.886814+03	2026-01-30 22:01:57.886814+03	3	single
6	Какой объект в 1С фиксирует события и влияет на учет?	2026-01-30 22:01:57.886814+03	2026-01-30 22:01:57.886814+03	3	single
7	Где в интерфейсе 1С логичнее всего искать отчеты?	2026-01-30 22:01:57.886814+03	2026-01-30 22:01:57.886814+03	3	single
8	Какова типовая последовательность действий пользователя в 1С?	2026-01-30 22:01:57.886814+03	2026-01-30 22:01:57.886814+03	3	single
9	Какие утверждения верно описывают платформу 1С?	2026-02-02 13:09:15.02812+03	2026-02-02 13:09:15.02812+03	3	multiple
10	Что пользователь может делать в списках 1С?	2026-02-02 13:11:03.193696+03	2026-02-02 13:11:03.193696+03	3	multiple
11	Продолжите фразу: справочники хранят данные, документы фиксируют события, а отчеты показывают …	2026-02-02 13:13:40.909388+03	2026-02-02 13:13:40.909388+03	3	text
26	Вопрос с одним верным ответом	2026-05-07 13:19:14.632+03	2026-05-07 13:19:14.632+03	16	single
27	Вопрос с несколькими ответами	2026-05-07 13:19:14.639+03	2026-05-07 13:19:14.639+03	16	multiple
28	Это вопрос с ... ответом	2026-05-07 13:19:14.643+03	2026-05-07 13:19:14.643+03	16	text
29	Все ...	2026-05-07 13:20:13.546+03	2026-05-07 13:20:13.546+03	17	text
30	цу	2026-05-07 20:10:52.514+03	2026-05-07 20:10:52.514+03	18	single
31	вавап	2026-05-07 20:10:52.52+03	2026-05-07 20:10:52.52+03	18	multiple
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20260130170236-add-test-to-lessons.js
20260202094144-add-type-to-questions.js
20260220184102-add-refresh-token-to-users.js
20260220185611-add-refresh-token-to-users.js
\.


--
-- Data for Name: Tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tests" (id, passing_percentage, status, "createdAt", "updatedAt", lesson_id) FROM stdin;
3	67	Готов	2026-01-30 21:58:33.338587+03	2026-01-30 21:58:33.338587+03	5
4	56	В разработке	2026-04-29 18:49:49.145+03	2026-04-29 18:49:49.145+03	\N
5	45	В разработке	2026-04-29 19:06:54.746+03	2026-04-29 19:06:54.746+03	\N
16	40	В разработке	2026-05-07 13:19:14.63+03	2026-05-07 13:19:14.63+03	90
17	90	В разработке	2026-05-07 13:20:13.543+03	2026-05-07 13:20:13.543+03	92
18	34	В разработке	2026-05-07 20:10:52.512+03	2026-05-07 20:10:52.512+03	96
\.


--
-- Data for Name: UserProgresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProgresses" (id, completed, "createdAt", "updatedAt", user_id, lesson_id) FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, password, email, role, avatar, "createdAt", "updatedAt", "refreshToken") FROM stdin;
4	Ставрогин Н.В.	$2b$05$42Tm97Emg7KzDqMMHYXWlujqzPLMpO42x2q9j4UEDVZkDz3VLoyji	star@mail.ru	Преподаватель	4db8f091-916c-434d-918e-1109afe1f6ee.jpg	2025-12-29 18:50:35.557+03	2026-05-12 21:14:00.694+03	\N
3	Мармеладов С.З.	$2b$05$LAL/cyt6H2TfDGB1cR.6jOo4ynrxQDtbt6wZVuZrF2RSa4DoziFqa	marm@mail.ru	Преподаватель	9b50237c-3e9a-4024-a01d-ea5e1be73b3d.jpg	2025-12-29 18:45:41.029+03	2026-04-23 18:37:12.231+03	\N
10	Кира	$2b$05$CA9lWtghv9zfRFQwvlAVuu.YcAb7uMF91VfvP6DsgZfeWTgX0ijoW	Red@mail.ru	Пользователь	\N	2026-04-12 12:58:12.539+03	2026-04-12 12:58:12.554+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTc3NTk4Nzg5MiwiZXhwIjoxNzc4NTc5ODkyfQ.mNjLnmnq1flZpmhj1OfL4hiZABsVlWVTLZwtghtFKAk
8	Bobbi	$2b$05$3FdjHnlTRJ9bAdW03GL4qO7z4qOYgcbd9YZ.8a.475X36Kz6sFEia	Bobbi@mil.ru	Пользователь	\N	2026-02-21 13:33:15.119+03	2026-02-21 13:33:15.133+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzcxNjY5OTk1LCJleHAiOjE3NzQyNjE5OTV9.hfg0DBEJ9esugEewoSUaJUx--hzDIUBoBYQszmNAUB4
5	Вадим	$2b$05$S8jhxOrxdogKhbKxm48Ike3YjIH5RQUP00x/y1i8lDEFnJXbal9NS	VvV@mail.ru	Пользователь	d3063f45-30f1-4abe-bb0e-d5d28be40203.jpg	2025-12-29 18:55:00.33+03	2026-06-04 13:48:45.03+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzgwNTcwMTI1LCJleHAiOjE3ODMxNjIxMjV9.98f5irtEsQj3iFZV8wLSdNKteKtWdEXgmbGetSTJh0s
9	Tomie	$2b$05$2J4p5vaH7vnpyMmhsLPf/OW8VF8djSKrycUf3VTq2RG9dt0cxRIVC	Bor@mail.ru	Пользователь	15961a52-f79a-49d6-be4d-ec1c75e45888.jpg	2026-03-14 19:53:01+03	2026-03-14 21:33:00.061+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzczNTEzMDM5LCJleHAiOjE3NzYxMDUwMzl9.p3oeYOog7-J2Bd6Nxoan5qYBbq88HiJKnmh1dMevCzs
11	Коля	$2b$05$Qj7tfr28STu43gqHvZivJezvLGvo8E3EUG5nTU5LXJAcGPePYxUV.	scott@mail.ru	Пользователь	ab4ee124-f46f-4d7d-a972-bdd185c93f79.png	2026-04-21 22:21:25.267+03	2026-04-21 22:23:51.999+03	\N
7	Админов В.В.	$2b$05$RqfZUThq78bzyKEKJYEQS.xCOeBqHmjZNQFyJm47RsRf14lQHjsE2	admin@mail.ru	Администратор	\N	2026-01-05 19:01:14.065+03	2026-04-21 22:31:38.841+03	\N
6	Дима	$2b$05$WpO1oEG7H8WLOfO6hX7b1.7uWVDDDjkDw7dMJePUryc6vgqmZKMkq	Dim@mail.ru	Пользователь	\N	2026-01-05 12:50:07.548+03	2026-05-06 12:32:06.714+03	\N
1	Валентинов А.А.	$2b$05$l6Yp6oPCHrdRqwFmjlcr1OksFzlP1Hu8X33zGRbc4lZa1V1/InaLe	valii@mail.ru	Преподаватель	\N	2025-12-29 18:38:06.855+03	2026-04-23 18:35:34.652+03	\N
\.


--
-- Name: Answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Answers_id_seq"', 80, true);


--
-- Name: CourseReviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CourseReviews_id_seq"', 1, false);


--
-- Name: Courses_Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Courses_Users_id_seq"', 32, true);


--
-- Name: Courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Courses_id_seq"', 81, true);


--
-- Name: Lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Lessons_id_seq"', 103, true);


--
-- Name: Payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payments_id_seq"', 1, false);


--
-- Name: Questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Questions_id_seq"', 36, true);


--
-- Name: Tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tests_id_seq"', 21, true);


--
-- Name: UserProgresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserProgresses_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 11, true);


--
-- Name: Answers Answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_pkey" PRIMARY KEY (id);


--
-- Name: CourseReviews CourseReviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseReviews"
    ADD CONSTRAINT "CourseReviews_pkey" PRIMARY KEY (id);


--
-- Name: CourseReviews CourseReviews_user_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseReviews"
    ADD CONSTRAINT "CourseReviews_user_id_course_id_key" UNIQUE (user_id, course_id);


--
-- Name: Courses_Users Courses_Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses_Users"
    ADD CONSTRAINT "Courses_Users_pkey" PRIMARY KEY (id);


--
-- Name: Courses_Users Courses_Users_user_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses_Users"
    ADD CONSTRAINT "Courses_Users_user_id_course_id_key" UNIQUE (user_id, course_id);


--
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);


--
-- Name: Courses Courses_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_title_key" UNIQUE (title);


--
-- Name: Lessons Lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons"
    ADD CONSTRAINT "Lessons_pkey" PRIMARY KEY (id);


--
-- Name: Payments Payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "Payments_pkey" PRIMARY KEY (id);


--
-- Name: Payments Payments_user_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "Payments_user_id_course_id_key" UNIQUE (user_id, course_id);


--
-- Name: Questions Questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Tests Tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tests"
    ADD CONSTRAINT "Tests_pkey" PRIMARY KEY (id);


--
-- Name: UserProgresses UserProgresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProgresses"
    ADD CONSTRAINT "UserProgresses_pkey" PRIMARY KEY (id);


--
-- Name: UserProgresses UserProgresses_user_id_lesson_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProgresses"
    ADD CONSTRAINT "UserProgresses_user_id_lesson_id_key" UNIQUE (user_id, lesson_id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Answers Answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES public."Questions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CourseReviews CourseReviews_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseReviews"
    ADD CONSTRAINT "CourseReviews_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CourseReviews CourseReviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseReviews"
    ADD CONSTRAINT "CourseReviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Courses_Users Courses_Users_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses_Users"
    ADD CONSTRAINT "Courses_Users_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Courses_Users Courses_Users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses_Users"
    ADD CONSTRAINT "Courses_Users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Lessons Lessons_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons"
    ADD CONSTRAINT "Lessons_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payments Payments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "Payments_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payments Payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "Payments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Questions Questions_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_test_id_fkey" FOREIGN KEY (test_id) REFERENCES public."Tests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tests Tests_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tests"
    ADD CONSTRAINT "Tests_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES public."Lessons"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserProgresses UserProgresses_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProgresses"
    ADD CONSTRAINT "UserProgresses_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES public."Lessons"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserProgresses UserProgresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProgresses"
    ADD CONSTRAINT "UserProgresses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Courses fk_courses_creator; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT fk_courses_creator FOREIGN KEY (creator_id) REFERENCES public."Users"(id);


--
-- PostgreSQL database dump complete
--

\unrestrict ZvqTD0cskSTkFpjENa691yR0X3s4MrF7fbLuh8yEsTGj4CYclApjWW5L5aJSTjC

