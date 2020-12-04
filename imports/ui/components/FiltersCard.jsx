import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import AwesomeDebouncePromise from 'awesome-debounce-promise';


import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}))



export default function RecipeReviewCard({onFilterChange}) {
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(true)
	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	const valueToStringQuery = (value)=>{
		if(!value) return null;
		if(value && (typeof value == "string") && value.trim() === "")
			return null;
		return {$regex: value, $options: "i"}
	}
	const onFilterChangeDebounced = AwesomeDebouncePromise(onFilterChange, 1000,{});


	return (
		<Paper elevation={2}>
		<Card >
			<CardActions disableSpacing style={{borderBottom: "solid 1px #DDD"}}>
				<Typography>Filters</Typography>

				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
			
					<Grid container>
						<Grid container   spacing={4}>
							<Grid item xs={12} md={6} lg={3}>
								<FormControl fullWidth={true}>
									<InputLabel>Lab Name</InputLabel>
									<Input onChange={(e) => {onFilterChangeDebounced("name", valueToStringQuery(e.target.value))}} />
								</FormControl>

							</Grid>
							<Grid item xs={12} md={6} lg={3}>
								<FormControl fullWidth={true}>
									<InputLabel>Director Name</InputLabel>
									<Input onChange={(e) => {onFilterChangeDebounced("director", valueToStringQuery(e.target.value))}} />
								</FormControl>
							</Grid>
								<Grid item xs={12} md={6} lg={3}>
								<FormControl fullWidth={true}>
									<InputLabel>City</InputLabel>
									<Input onChange={(e) => {onFilterChangeDebounced("city", valueToStringQuery(e.target.value))}} />
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6} lg={3}>
								<FormControl fullWidth={true}>
									<InputLabel>Country</InputLabel>
									<Input onChange={(e) => {onFilterChangeDebounced("country", valueToStringQuery(e.target.value))}} />
								</FormControl>
							</Grid>
						</Grid>
			
					</Grid>
				</CardContent>
			</Collapse>
		</Card>
		</Paper>
	)
}
