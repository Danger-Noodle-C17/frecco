import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';        


const locationOptions = ['Paris','Netherlands','China'];
const locationItems = [];
locationOptions.forEach((loc, i) => (
    locationItems.push(<MenuItem key={'loc'+i} value={loc}>{loc}</MenuItem>)
)); 

const categoryOptions = ['Accomodation','Food','Attraction','Activity'];
const categoryItems = [];
categoryOptions.forEach((cat, i) => (
    categoryItems.push(<MenuItem key={'cat'+i} value={cat}>{cat}</MenuItem>)
)); 

export default function FilterForm(props) {
    return (
    <div id='filter-form' >
        <FormControl style={{minWidth: 100}}>
            <InputLabel>Location</InputLabel>
            <Select value={props.location ? props.location : ""} onChange={props.handleChangeLocation}>
                {locationItems}
            </Select>
        </FormControl>
        &nbsp;&nbsp;
        <FormControl style={{minWidth: 100}}>
            <InputLabel>Category</InputLabel>
            <Select value={props.category ? props.category : ""} onChange={props.handleChangeCategory}>
                {categoryItems}
            </Select>
        </FormControl>
        &nbsp;&nbsp;
        <FormControl style={{minWidth: 100}}>
            <InputLabel>Min. Rating</InputLabel>
            <Select value={props.minrating ? props.minrating :1} onChange={props.handleChangeRating}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
        </FormControl>
        &nbsp;&nbsp;
        <div style={{ width : 160}}>
            <Autocomplete
                multiple
                id='filterFriends'
                options={props.friends}
                getOptionLabel={option => option.username}
                renderInput={params => (
                    <TextField {...params} label="Friends" margin="normal" variant="outlined"/>
                )}
                onChange={(e,value) => props.handleChangeFriendsFilter(e,value)}
            />    
        </div>
        &nbsp;&nbsp;
        <Button style={{ height : 50 }} onClick={props.filterPosts} variant='contained'>Filter</Button>
    </div>
    )
}