import { SearchOutlined } from '@mui/icons-material';
import styled from 'styled-components';


const SearchBarContainer = styled.div`
max-width: 550px;
display: flex;
width: 90%;
border: 1px solid ${({theme})=> theme.text_secondary + 90};
color: ${({theme})=> theme.text_primary};
border-radius: 8px;
cursor: pointer;
padding: 12px 16px;
gap: 6px;
align-items: center;
`

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
}

const SearchBar = ({search, setSearch}: SearchBarProps) => {
    return (
        <SearchBarContainer>
            <SearchOutlined />
            <input  style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                backgroundColor: 'transparent',
                color: 'inherit',
                fontSize: '16px'
            }}
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text" placeholder="Search for a post" />
        </SearchBarContainer>
    )
}

export default SearchBar;