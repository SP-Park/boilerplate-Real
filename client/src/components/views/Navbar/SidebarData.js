import { AiOutlineAreaChart, AiFillBank, AiOutlineUsergroupAdd, AiOutlineDown, AiOutlineUp,AiOutlineContacts
,AiOutlineDatabase, AiOutlineAlert, AiOutlineRise
} from "react-icons/ai";


export const SidebarData = [
    {
        title: '고객 관리',
        path: '/',
        className: 'nav-text',
        icon: <AiFillBank />,
        iconClosed: <AiOutlineDown />,
        iconOpened: <AiOutlineUp />,
        subNav: [
            {
                title: '직장인',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '직장인 입력',
                className: 'nav-text',
                path: '/'
            },
        ]
    },
    {
        title: '사용자 관리',
        path: '/users',
        className: 'nav-text',
        icon: <AiOutlineUsergroupAdd />,
        iconClosed: <AiOutlineDown />,
        iconOpened: <AiOutlineUp />,
        subNav: [
            {
                title: 'TM 담당',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '입력 담당',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '팀장',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '이사',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '슈퍼',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '마스터',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '금융사 입력',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '프로젝트팀',
                className: 'nav-text',
                path: '/'
            },
        ]
    },
    {
        title: '일지 관리',
        path: '/users',
        className: 'nav-text',
        icon: <AiOutlineDatabase />,
        iconClosed: <AiOutlineDown />,
        iconOpened: <AiOutlineUp />,
        subNav: [
            {
                title: '확정관리',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '담당/금융사 별',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '금융사 별',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '추천인 별',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '개인 별',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '실적 그래프(팀별)',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '실적 그래프(대비)',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '프로젝트 팀별',
                className: 'nav-text',
                path: '/'
            },
        ]
    },
    {
        title: '통계',
        path: '/users',
        className: 'nav-text',
        icon: <AiOutlineAreaChart />,
        iconClosed: <AiOutlineDown />,
        iconOpened: <AiOutlineUp />,
        subNav: [
            {
                title: '일별 전송통계',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '일별 입력통계',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '추천인 입력현황',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '추천인 입력현황(대비)',
                className: 'nav-text',
                path: '/'
            }
        ]
    },
    {
        title: '보안 관리',
        path: '/users',
        className: 'nav-text',
        icon: <AiOutlineAlert />,
        iconClosed: <AiOutlineDown />,
        iconOpened: <AiOutlineUp />,
        subNav: [
            {
                title: '아이피 관리',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '접속 기록',
                className: 'nav-text',
                path: '/security/connections'
            },
            {
                title: '배정순서 관리',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '프로젝트팀 배정순서 관리',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '팀순서 관리',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '자동/수동 배정',
                className: 'nav-text',
                path: '/'
            },
            {
                title: '사이트 폐쇄',
                className: 'nav-text',
                path: '/'
            }
        ]
    },
]

export default SidebarData;

