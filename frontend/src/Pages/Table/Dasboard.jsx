import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useEffect, useState } from "react";
import { Button, Table, Input, Space, Popconfirm, message } from "antd";
import "../../Styles/Dashboard.css";
import Highlighter from "react-highlight-words";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getPositionData } from "../../Redux/Position/Get/action";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/index";
import HamburgerNavbar from "../../Components/HamburgerNavbar/index";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((store) => store?.getPosition);

  console.log(data);
  useEffect(() => {
    dispatch(getPositionData());
  }, []);

  console.log(data);
  useEffect(() => {
    dispatch(getPositionData());
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "SL ID",
      dataIndex: "id",
      align: "center",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      key: "id",
      title: "TITLE",
      dataIndex: "title",
      align: "center",
      sorter: (record1, record2) => {
        return record1.title > record2.title;
      },
      responsive: ["sm"],
      width: "20%",

      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => navigate(`/position/${record._id}`)}
            >
              {record.title}
            </Button>
          </>
        );
      },
    },
    {
      key: "3",
      title: "COMPANY",
      dataIndex: "companyName",
      align: "center",
      width: "25%",

      responsive: ["md", "sm"],
      ...getColumnSearchProps("companyName"),
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                navigate(`/companies/${record.companyId}`);
                console.log(record.companyId);
              }}
            >
              {record.companyName}
            </Button>
          </>
        );
      },
    },
    {
      key: "id",
      title: "CATEGORY",
      dataIndex: "category",
      responsive: ["sm"],
      align: "center",
      sorter: (record1, record2) => {
        return record1.category > record2.category;
      },
      width: "10%",
    },
    {
      key: "id",
      title: "DATE OF POSITION",
      dataIndex: "timeStap",
      align: "center",
      responsive: ["sm"],
      width: "10%",
    },
    {
      key: "id",
      title: "OPENING",
      dataIndex: "openings",
      align: "center",
      sorter: (record1, record2) => {
        return record1.opening > record2.opening;
      },
      responsive: ["sm"],
      width: "5%",
    },
    {
      key: "id",
      title: "OPENINGS (BD BY POC)",
      dataIndex: "openingsPOC",
      width: "10%",
      align: "center",
      responsive: ["sm"],
    },
    {
      key: "id",
      title: "POC",
      dataIndex: "poc",
      responsive: ["sm"],
      width: "10%",
      align: "center",
      // filters: [
      //   { text: "RAHUL", value: "RAHUL" },
      //   {
      //     text: "NEHA",
      //     value: "NEHA",
      //   },

      //   { text: "PRAVEENA", value: "PRAVEENA" },
      //   { text: "AYESHA", value: "AYESHA" },
      //   { text: "AYESHA", value: "AYESHA" },
      // ],
      onFilter: (value, record) => {
        return record.poc === value;
      },
      filterSearch: true,
      sorter: (record1, record2) => {
        return record1.poc > record2.poc;
      },
    },
    {
      key: "id",
      title: "ACTION",
      align: "center",
      width: "10%",
      render: (_, record) => {
        const authDetails = JSON.parse(localStorage.getItem("authDetails"));
        const role = authDetails?.userDetails?.role;

        const isAdmin = role === "Admin";

        return (
          <>
            <Space>
              <Button
                type="link"
                // disabled={!isAdmin}
                onClick={() => {
                  if (isAdmin) {
                    navigate(`/editPosition/${record._id}`);
                    setOpen(true);
                  } else {
                    message.error(
                      "You are not authorized to edit, Please contact to Masai Team",
                      4
                    );
                  }
                }}
              >
                <EditOutlined />
              </Button>
              <Popconfirm
                title="Sure to delete?"
                disabled={!isAdmin}
                hidden={!isAdmin}
                onConfirm={() => handleDelete(record._id)}
              >
                <a>
                  <DeleteOutlined
                    onClick={() => {
                      if (!isAdmin) {
                        message.error(
                          "You are not authorized to delete, Please contact to Masai Team",
                          4
                        );
                      }
                    }}
                  />
                </a>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const handleDelete = (_id) => {
    console.log(_id, "fet");
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;
    fetch(`https://test-production-e6c2.up.railway.app/deletePosition/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getPositionData());
        message.success("Deleted Successfully");
      })
      .catch((error) => message.error("Something went wrong while Deleting"));
  };

  const handleCreate = () => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let role = authDetails?.userDetails?.role;
    console.log(role);
    if (role === "Admin") {
      navigate("/createPosition");
    } else {
      message.error("You are not authorized, Please contact to Masai Team", 4);
    }
  };

  return (
    <>
      <HamburgerNavbar />
      <div
        style={{
          padding: "1%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 60,
        }}
      >
        <div>
          <h2 style={{ marginTop: "-5px" }}>Positions</h2>
        </div>
        <Button
          type="primary"
          style={{
            float: "right",
            background: "#1F2937",
            width: 100,
            marginTop: "-5px",
          }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      <div className="dashboard_div" style={{ overflow: "auto" }}>
        <Table
          loading={loading}
          columns={columns}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,

            onChange: (page, pageSize) => {
              setPage(page);
              setpageSize(pageSize);
            },
          }}
        ></Table>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
