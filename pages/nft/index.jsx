import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row, Tabs, Tab, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../utils/axios.interceptor";

const MyNft = () => {
    const [backUpPData, setBackUpPData] = useState([]);
    const [polygonNftData, setPolygonNftData] = useState([]);
    let [totalNFts, setTotalNFts] = useState([]);
    let [balance, setBalance] = useState({});
    let [mintData, setMintData] = useState([]);

    useEffect(() => {
        // getAllAvailableNFTsMetaData();
        getAllEthNftData();
    }, []);

    const getAllEthNftData = async () => {
        const ethnftWalletAddress = getCookie("ethnftWalletAddress");
        try {
            let resp = await axios.get(`https://vjl5a7qz3c.execute-api.ap-south-1.amazonaws.com/dev/eth-nft-item?ChainType=goerlitestnet&NFTOwnerAddress=${ethnftWalletAddress}`);
            if (resp.data.length > 0) {
                setBackUpPData(resp.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const getAllPolygonNftData = async () => {
        const polygonnftWalletAddress = getCookie("polygonnftWalletAddress");
        try {
            let resp = await axios.get(`https://vjl5a7qz3c.execute-api.ap-south-1.amazonaws.com/dev/eth-nft-item?ChainType=polygontestnet&NFTOwnerAddress=${polygonnftWalletAddress}`);

            if (resp.data.length > 0) {
                setPolygonNftData(resp.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const getAllAvailableNFTsMetaData = async () => {
        try {
            let resp = await axios.get(
                "https://solana-gateway.moralis.io/account/devnet/EPa2xy7bb2cWjTvmoFyGkW4UCBP1QUoJt5F7HF6kdERR/portfolio",
                {
                    headers: {
                        accept: "application/json",
                        "X-API-Key":
                            "CM7N6dMbLldEIUX7oVJGrRHmOjaePtGKjb485UKJDjaI9WYwKrkJ6dlsZ6Z3OziA",
                    },
                }
            );
            let { nfts, nativeBalance } = resp.data;
            setMintData(nfts);
            setBalance(nativeBalance);
            getAllNFTs(nfts);
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const getAllNFTs = async (nfts) => {
        let totalNFTs = [];
        let mintData = nfts;
        for (let i = 0; i < mintData.length; i++) {
            let NFTdata = await axios.get(
                `https://solana-gateway.moralis.io/nft/devnet/${mintData[i].mint}/metadata`,
                {
                    headers: {
                        accept: "application/json",
                        "X-API-Key":
                            "CM7N6dMbLldEIUX7oVJGrRHmOjaePtGKjb485UKJDjaI9WYwKrkJ6dlsZ6Z3OziA",
                    },
                }
            );
            /*let data = await axios.get(
                `${NFTdata?.data.metaplex?.metadataUri}`
            );
            */
            let data = await fetch(`${NFTdata?.data.metaplex?.metadataUri}`)
                .then(response => response.json())    // one extra step
                .then(data)
                .catch(error => console.error(error));
            console.log('data', data)
            NFTdata.data = { ...NFTdata.data, metaAPIData: data, price: mintData[i].amountRaw };
            console.log('NFTdata', NFTdata.data)
            /*
            NFTdata.data.metaAPIData = {
                ...NFTdata.data.metaAPIData,
                price: mintData[i].amountRaw,
            };
            */
            totalNFTs.push(NFTdata.data);
        }

        setTotalNFts(totalNFTs);
    };

    const onSelectTab = (key) => {
        if (key === "ethereum") {
            getAllEthNftData();
        } else if (key === "solana") {
            getAllAvailableNFTsMetaData();
        } else if (key === "polygon") {
            getAllPolygonNftData();
        }
    };

    return (
        <>
            <Layout title="My NFT" metaDescription={[{ name: "description", content: "Address Book" }]}>
                <div id="pageContainer" className="container">
                    <Breadcrumb className="m-2">
                        <Link href="/" passHref>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Link>
                        <Link href="/account" passHref>
                            <Breadcrumb.Item>My Account</Breadcrumb.Item>
                        </Link>
                        <Breadcrumb.Item active>My NFT</Breadcrumb.Item>
                    </Breadcrumb>
                    <MyAccountLayout title="My NFT" activeLink={13}>
                        <div id="editTabs" className="py-3 px-5">
                            <Tabs defaultActiveKey="ethereum" onSelect={(key) => onSelectTab(key)} id="uncontrolled-tab" className="mb-3 nav-fill">
                                <Tab eventKey="ethereum" title={<span>ETHEREUM <Image
                                    src="/images/ethlogo.png"
                                    height="23px"
                                    width="23px"
                                    alt=""
                                /></span>} >
                                    <Row>
                                        {backUpPData.length > 0 &&
                                            backUpPData.map((val, idx) => {
                                                return (
                                                    <Col key={idx} lg={3} md={6} className="mb-3">
                                                        <Card>
                                                            <Card.Body>
                                                                <a href={`https://testnets.opensea.io/assets/goerli/${val.DeployedIn}/${val.NFTCode}`} target="_blank" rel="noopener noreferrer">
                                                                    <Image
                                                                        className="ic-card-img-top mb-2"
                                                                        src={val.image}
                                                                        alt="Card image cap"
                                                                        height="150px"
                                                                        width="150px"

                                                                    />
                                                                </a>
                                                                <div className="ic-card-body">
                                                                    <h5 className="ic-card-title">
                                                                        {val.name}
                                                                    </h5>
                                                                    <div className="mb-2">
                                                                        Price:
                                                                        <Image
                                                                            src="/images/ethlogo.png"
                                                                            height="20px"
                                                                            width="20px"
                                                                            alt=""
                                                                        />
                                                                        <span>
                                                                            {val.NFTPrice}
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                                <Button variant="deep-purple-900" className="w-100">
                                                                    Buy now
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            })}
                                    </Row>
                                </Tab>
                                <Tab eventKey="polygon" title={<span>POLYGON
                                    {/* <Image
                                        src="/images/ethlogo.png"
                                        height="23px"
                                        width="23px"
                                        alt=""
                                    /> */}
                                </span>} >
                                    <Row>
                                        {polygonNftData.length > 0 &&
                                            polygonNftData.map((val, idx) => {
                                                return (
                                                    <Col key={idx} lg={3} md={6} className="mb-3">
                                                        <Card>
                                                            <Card.Body>
                                                                <a href={`https://testnets.opensea.io/assets/mumbai/${val.DeployedIn}/${val.NFTCode}`} target="_blank" rel="noopener noreferrer">
                                                                    <Image
                                                                        className="ic-card-img-top mb-2"
                                                                        src={val.image}
                                                                        alt="Card image cap"
                                                                        height="150px"
                                                                        width="150px"

                                                                    />
                                                                </a>
                                                                <div className="ic-card-body">
                                                                    <h5 className="ic-card-title">
                                                                        {val.name}
                                                                    </h5>
                                                                    <div className="mb-2">
                                                                        Price:
                                                                        <Image
                                                                            src="/images/ethlogo.png"
                                                                            height="20px"
                                                                            width="20px"
                                                                            alt=""
                                                                        />
                                                                        <span>
                                                                            {val.NFTPrice}
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                                <Button variant="deep-purple-900" className="w-100">
                                                                    Buy now
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            })}
                                    </Row>
                                </Tab>
                                <Tab eventKey="solana" title={<span>SOLANA <Image
                                    src="/images/solanalogo.png"
                                    height="25px"
                                    width="25px"
                                    alt=""
                                /></span>}>
                                    <Row>
                                        {totalNFts.length > 0 &&
                                            totalNFts.map((val, idx) => {
                                                return (
                                                    <Col key={idx} lg={3} md={6} className="mb-3">
                                                        <Card>
                                                            <Card.Body>
                                                                <a href={`https://solscan.io/token/${val?.mint}?cluster=devnet`} target="_blank" rel="noopener noreferrer">
                                                                    <Image
                                                                        className="ic-card-img-top mb-2"
                                                                        src={val.metaAPIData.image}
                                                                        alt="Card image cap"
                                                                        height="150px"
                                                                        width="150px"
                                                                    />
                                                                </a>
                                                                <div className="ic-card-body">
                                                                    <h5 className="ic-card-title">
                                                                        {val.name}
                                                                    </h5>
                                                                    <div className="mb-2">
                                                                        Price:
                                                                        <Image
                                                                            src="/images/solanalogo.png"
                                                                            height="20px"
                                                                            width="20px"
                                                                            alt=""
                                                                        />
                                                                        <span>
                                                                            {val.price}
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                                <Button variant="deep-purple-900" className="w-100">
                                                                    Buy now
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            })}
                                    </Row>
                                </Tab>
                            </Tabs>
                        </div>
                    </MyAccountLayout>
                </div>
            </Layout>
        </>
    );
};
export default withAuth(MyNft);
