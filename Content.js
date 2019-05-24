import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux'
 
import { deleteCard, addInnerCard } from './actions'
 
const styles = {
  allCards:{
   position: 'relative',
    display:'flex',
    flexFlow: 'wrap',
  },
  card: {
    minWidth: 400,
    minHeight:300,
    margin:30,
  },
  cardLable:{
    position: 'absolute',
    margin:10,
  },
  addBut:{
      float: 'right'
  },
  delBut:{
    float: 'right',
    color: 'red',
    marginLeft: 20,
  },
  innerCard:{
    minWidth: 200,
    minHeight:200,
    margin:30,
    marginTop:50,
  },
  addCheckBut:{
      marginTop:40,
      height:26,
  }
};
 
class ContentCards extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
    }
    deleteCard = (id) => {
        console.log(id);
        this.props.deleteCard(id)
    }
    addInnerCard=(id)=>{
      this.props.addInnerCard(id)
    }
    render(){
        const { classes } = this.props;
        console.log('props', this.props.cardArrayNames);
        return (
            <>
                <div className={classes.allCards}>
                    {this.props.cardArrayNames.map((val) =>{
                    return ( <Card className={classes.card} key={val.id}>
                                   <CardContent>
                                        <label className={classes.cardLable}>{val.name}</label>                                  
                                        <IconButton aria-label="Delete" className={classes.delBut} onClick={() => this.deleteCard(val.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Fab size="small" color="primary" aria-label="Add" className={classes.addBut} onClick = {() =>this.addInnerCard(val.id)}>
                                            <AddIcon />
                                        </Fab>
                                        {this.props.innerCard.map((iVal)=>{
                                            return (iVal.id === val.id ? <Card className={classes.innerCard}>
                                                        <CardContent>
                                                            <label className={classes.cardLable}>{iVal.name} {iVal.story}</label>                                  
                                                            <IconButton aria-label="Delete" className={classes.delBut} >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <Fab size="small" color="primary" aria-label="Add" className={classes.addBut}>
                                                                <AddIcon />
                                                           </Fab>
                                                        </CardContent>
                                                    </Card> : null
                                            )
                                        })}
                                    </CardContent>
                                </Card>)}
                    )}
                </div>
            </>
        );
    }
}
 
ContentCards.propTypes = {
  classes: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    cardArrayNames: state.cardArrayNames,
    cardNumber: state.cardNumber,
    innerCard:state.innerCard
})
 
const mapDispatchToProps = dispatch => ({
    deleteCard: cardNumber => dispatch(deleteCard(cardNumber)),
    addInnerCard: id => dispatch(addInnerCard(id))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ContentCards))
 