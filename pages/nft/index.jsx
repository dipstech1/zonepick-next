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
    let [totalNFts, setTotalNFts] = useState([]);
    let [balance, setBalance] = useState({});
    let [mintData, setMintData] = useState([]);

    useEffect(() => {
        getAllAvailableNFTs();
        getAllAvailableNFTsMetaData();
    }, []);

    const getAllAvailableNFTs = async () => {
        try {
            let resp = await axios.get(
                "https://deep-index.moralis.io/api/v2/nft/0x2f3df7d1511d79cca159205caf546848e0dd9e7f?chain=rinkeby&format=decimal",
                {
                    headers: {
                        accept: "application/json",
                        "X-API-Key":
                            "CM7N6dMbLldEIUX7oVJGrRHmOjaePtGKjb485UKJDjaI9WYwKrkJ6dlsZ6Z3OziA",
                    },
                }
            );
            if (resp.data) {
                let { result } = resp.data;
                result.forEach((item) => {
                    item.metadata = JSON.parse(item.metadata);
                });
                setBackUpPData(result);
            }
            // console.log(getData);
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
            getAllAvailableNFTs();
        } else if (key === "solana") {
            getAllAvailableNFTsMetaData();
        }
    }

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
                                                    val.metadata && (
                                                        <Col key={idx} lg={3} md={6} className="mb-3">
                                                            <Card>
                                                                <Card.Body>
                                                                    <a href={`https://testnets.opensea.io/assets/rinkeby/${val?.token_address}/${val?.token_id}`} target="_blank" rel="noopener noreferrer">
                                                                        <Image
                                                                            className="ic-card-img-top mb-2"
                                                                            src={val?.metadata?.image || val?.metadata[0]?.image}
                                                                            alt="Card image cap"
                                                                            height="150px"
                                                                            width="150px"

                                                                        />
                                                                    </a>
                                                                    <div className="ic-card-body">
                                                                        <h5 className="ic-card-title">
                                                                            {val?.metadata?.name || val?.metadata[0]?.name}
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
                                                                                {val?.metadata?.NFTPrice ||
                                                                                    val?.metadata[0]?.NFTPrice ||
                                                                                    0}
                                                                            </span>

                                                                        </div>
                                                                    </div>
                                                                    <Button variant="deep-purple-900" className="w-100">
                                                                        Buy now
                                                                    </Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    )
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
