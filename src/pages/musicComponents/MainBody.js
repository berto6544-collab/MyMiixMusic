import React from "react";
import "../../music-css/Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TopHitViewer from "../../components/ViewerComp/TopHitViewer";
import NewReleaseViewer from "../../components/ViewerComp/NewReleaseViewer";
import TopArtistsViewer from "../../components/ViewerComp/TopArtistsViewer";
import AlbumsViewer from "../../components/ViewerComp/AlbumViewer";
import ContainerViewer from "../../components/ViewerComp/ContainerViewer";


function Body({ spotify,dataSource }) {
const [containerData,setDataSourceContainer] = React.useState(
[
{
"art":"",
"title":"",
"uniqId":""

},
{
"art":"",
"title":"",
"uniqId":""
  
},
{
"art":"",
"title":"",
"uniqId":""
    
},
{
"art":"",
"title":"",
"uniqId":""
      
},
{
  "art":"",
  "title":"",
  "uniqId":""
        
  }

])



  return (
    <div className="body">
      <Header spotify={spotify} />


      <div className="body__songs">
      
        {dataSource != null && dataSource.new_releases.length > 0 ?<NewReleaseViewer dataSource={dataSource.new_releases} dataSourcce={[]} hasMorre={false} />
        
        :dataSource != null && dataSource.new_releases.length == 0?null

        :< ContainerViewer dataSourcce={[]} hasMorre={false} dataSource={containerData} Title={"New Releases"} />}

        {dataSource != null && dataSource.TopHits.length > 0 ?<TopHitViewer dataSource={dataSource.TopHits} dataSourcce={[]} hasMorre={false} />
        
        :dataSource != null && dataSource.TopHits.length == 0 ?null

        :< ContainerViewer dataSourcce={[]} hasMorre={false} dataSource={containerData} Title={"Top Hits"} />}

        {dataSource != null && dataSource.TopArtists.length > 0 ?<TopArtistsViewer dataSource={dataSource.TopArtists} dataSourcce={[]} hasMorre={false} />
        
        :dataSource != null && dataSource.TopArtists.length == 0 ?null
        
        :< ContainerViewer dataSourcce={[]} hasMorre={false} dataSource={containerData} Title={"Top Artists"} />}

        {dataSource != null && dataSource.Album.length > 0?<AlbumsViewer dataSource={dataSource.Album} dataSourcce={[]} hasMorre={false} />
        
        :dataSource != null && dataSource.Album.length == 0?null
        
        :< ContainerViewer dataSourcce={[]} hasMorre={false} dataSource={containerData} Title={"Albums"} />}


      </div>
    </div>
  );
}

export default Body;
