import { Modal, DatePicker, TimePicker, Select, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { updateITimeCardAPI } from "../../../services/Card/Card.service";

const DateModal = (props: any) => {

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [timer, setTimer] = useState<dayjs.Dayjs | null>(null);
  const [currentTimer, setCurrentTimer] = useState<number | null>(null);
  useEffect(() => {
    setStartDate(props.start_date);
    setEndDate(props.end_date);
    setCurrentTimer(props.timer);
    if (props.timer) {
      setCurrentTimer(dayjs(props.end_date).diff(dayjs(props.timer), 'minutes'));
    }
  }, [props.card_id])

  const handleUpdateTime = async () => {
    const payload = {
      start_date: startDate ? dayjs(startDate).format("YYYY-MM-DD HH:mm:ss") : null,
      end_date: endDate ? dayjs(endDate).format("YYYY-MM-DD HH:mm:ss") : null,
      timer: timer ? dayjs(timer).format("YYYY-MM-DD HH:mm:ss") : null,
    };

    try {
      await updateITimeCardAPI(props.card_id, payload);
      props.handleNotification("Cập nhật thời gian thành công.", "success");
      props.onClose();

    } catch (error) {
      props.handleNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
    }
  };

  return (
    props.isModalDate ? (
      <Modal
        width={300}
        title="Ngày"
        open={props.isOpen}
        footer={null}
        onCancel={props.onClose}
        style={{ marginRight: 320, marginTop: 150 }}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={startDate !== null}
              onChange={(e) =>
                setStartDate(e.target.checked ? dayjs() : null)
              }
            >
              Ngày bắt đầu
            </Checkbox>
            {startDate && (
              <DatePicker
                value={dayjs(startDate)}
                onChange={(date) => setStartDate(date)}
                style={{ width: "100%" }}
                inputReadOnly={true}
              />
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={endDate !== null}
              onChange={(e) =>
                setEndDate(e.target.checked ? dayjs().add(1, 'day') : null)
              }
            >
              Ngày hết hạn
            </Checkbox>
            {endDate && (
              <div style={{ display: "flex", gap: 8 }}>
                <DatePicker
                  value={dayjs(endDate)} // endDate đã là dayjs hoặc null
                  onChange={(date) => {
                    if (date) {
                      setEndDate((prev) => {
                        const prevDayjs = prev ? dayjs(prev) : dayjs();
                        return dayjs(date)
                          .set("hour", prevDayjs.hour())
                          .set("minute", prevDayjs.minute())
                          .set("second", 0);
                      });
                    } else {
                      setEndDate(null);
                    }
                  }}
                  inputReadOnly={true}
                />
                <TimePicker
                  value={dayjs(endDate)}
                  onChange={(time) => {
                    if (time) {
                      setEndDate((prev) => {
                        const prevDayjs = prev ? dayjs(prev) : dayjs();
                        return prevDayjs
                          .set("hour", time.hour())
                          .set("minute", time.minute())
                          .set("second", 0);
                      });
                    }
                  }}
                  format="HH:mm"
                  showNow={false}
                  minuteStep={1}
                  popupClassName="no-seconds-picker"
                  inputReadOnly={true}
                  hideDisabledOptions
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <span>Thiết lập Nhắc nhở</span>
            <Select
              value={currentTimer}
              onChange={(value: any) => {
                if (value === null) {
                  setTimer(null);
                } else {
                  setTimer(dayjs(endDate).subtract(value, 'minutes'));
                }
                setCurrentTimer(value)
              }}
              style={{ width: "100%", marginTop: 8 }}
            >
              <Select.Option value={null}>Không có</Select.Option>
              <Select.Option value={0}>Vào thời điểm hết hạn</Select.Option>
              <Select.Option value={5}>5 Phút trước</Select.Option>
              <Select.Option value={10}>10 Phút trước</Select.Option>
            </Select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={props.onClose}>Gỡ bỏ</Button>
            <Button type="primary" onClick={handleUpdateTime}>
              Lưu
            </Button>
          </div>
        </div>
      </Modal>
    ) : (
      <>
        <div style={{ width: "250px" }}>
          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={startDate !== null}
              onChange={(e) =>
                setStartDate(e.target.checked ? dayjs() : null)
              }
            >
              Ngày bắt đầu
            </Checkbox>
            {startDate && (
              <DatePicker
                value={dayjs(startDate)}
                onChange={(date) => setStartDate(date)}
                style={{ width: "100%" }}
                inputReadOnly={true}
              />
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={endDate !== null}
              onChange={(e) =>
                setEndDate(e.target.checked ? dayjs() : null)
              }
            >
              Ngày hết hạn
            </Checkbox>
            {endDate && (
              <div style={{ display: "flex", gap: 8 }}>
                <DatePicker
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(date) => {
                    if (date) {
                      setEndDate((prev) => {
                        const prevDayjs = prev ? dayjs(prev) : dayjs();
                        return dayjs(date)
                          .set("hour", prevDayjs.hour())
                          .set("minute", prevDayjs.minute())
                          .set("second", 0);
                      });
                    } else {
                      setEndDate(null);
                    }
                  }}
                  inputReadOnly={true}
                />
                <TimePicker
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(time) => {
                    if (time) {
                      setEndDate((prev) => {
                        const currentDate = prev ? dayjs(prev) : dayjs();
                        return currentDate
                          .set("hour", time.hour())
                          .set("minute", time.minute())
                          .set("second", 0);
                      });
                    }
                  }}
                  format="HH:mm"
                  showNow={false}
                  minuteStep={1}
                  popupClassName="no-seconds-picker"
                  inputReadOnly={true}
                  hideDisabledOptions
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <span>Thiết lập Nhắc nhở</span>
            <Select
              value={currentTimer}
              onChange={(value: any) => {
                if (value === null) {
                  setTimer(null);
                } else {
                  setTimer(dayjs(endDate).subtract(value, 'minutes'));
                }
                setCurrentTimer(value)
              }}
              style={{ width: "100%", marginTop: 8 }}
            >
              <Select.Option value={null}>Không có</Select.Option>
              <Select.Option value={0}>Vào thời điểm hết hạn</Select.Option>
              <Select.Option value={5}>5 Phút trước</Select.Option>
              <Select.Option value={10}>10 Phút trước</Select.Option>
            </Select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button type="primary" onClick={handleUpdateTime}>
              Lưu
            </Button>
          </div>
        </div>
      </>
    )
  );
};

export default DateModal;