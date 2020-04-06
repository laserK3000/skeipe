import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import { getGeoJSONdata } from './map'

class Input extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    getGeoJSONdata().then((res) => {
      this.setState({ data: res["features"].map(kneipe => ({ key: kneipe.id, value: kneipe.properties["addr:city"] ? kneipe.properties.name + " (" + kneipe.properties["addr:city"] + ")" : kneipe.properties.name , kneipe: kneipe}))});
    })
  }

  render() {
    return (
      <>
      <ReactSearchBox
        placeholder="Suche deine Lieblingskneipe"
        data={this.state.data}
        onSelect={record => window.location = "/stream/" + encodeURIComponent(record.key) }
        fuseConfigs={{
          threshold: 0.05,
          minMatchCharLength: 3,

        }}
        value=""
      />
      <style>{`
        .react-search-box-dropdown-list-item {
          color: black;
        }
      `}</style>
      </>
    )
  }
}

export { Input }
